import { ConflictException, ServiceUnavailableException } from '@nestjs/common';
import { S3Client, PutObjectCommand, HeadObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StagingStorageService, STAGING_BUCKET } from './staging-storage.service';

jest.mock('@aws-sdk/s3-request-presigner', () => ({ getSignedUrl: jest.fn() }));
jest.mock('@aws-sdk/client-s3', () => {
  const actual = jest.requireActual('@aws-sdk/client-s3');
  return { ...actual, S3Client: jest.fn() };
});

describe('StagingStorageService', () => {
  const send = jest.fn();
  const destroy = jest.fn();
  let storage: StagingStorageService;
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(S3Client).mockImplementation(() => ({ send, destroy }) as unknown as S3Client);
    storage = new StagingStorageService();
  });
  afterEach(() => storage.onModuleDestroy());
  it('uses the default credential chain and no client-supplied endpoints', () => {
    expect(S3Client).toHaveBeenCalledWith({ region: 'us-east-2', requestChecksumCalculation: 'WHEN_REQUIRED' });
  });
  it('signs Content-Type and If-None-Match for exactly five minutes', async () => {
    jest.mocked(getSignedUrl).mockResolvedValue('https://signed.example.test');
    await expect(storage.presign('uploads/album/photo.webp', 'image/webp')).resolves.toBe('https://signed.example.test');
    const [, command, options] = jest.mocked(getSignedUrl).mock.calls[0];
    expect(command).toBeInstanceOf(PutObjectCommand);
    expect((command as PutObjectCommand).input).toEqual({ Bucket: STAGING_BUCKET,
      Key: 'uploads/album/photo.webp', ContentType: 'image/webp', IfNoneMatch: '*' });
    expect(options).toEqual({ expiresIn: 300, signableHeaders: new Set(['content-type', 'if-none-match']) });
  });
  it('does not expose AWS signing errors', async () => {
    jest.mocked(getSignedUrl).mockRejectedValue(new Error('sensitive provider details'));
    await expect(storage.presign('uploads/a/b.webp', 'image/webp')).rejects.toBeInstanceOf(ServiceUnavailableException);
    await expect(storage.presign('uploads/a/b.webp', 'image/webp')).rejects.not.toThrow('sensitive provider details');
  });
  it('checks only the staging bucket with HeadObject', async () => {
    send.mockResolvedValue({ ContentLength: 42, ContentType: 'image/webp' });
    await expect(storage.head('uploads/a/b.webp')).resolves.toMatchObject({ ContentLength: 42 });
    expect(send.mock.calls[0][0]).toBeInstanceOf(HeadObjectCommand);
    expect(send.mock.calls[0][0].input).toEqual({ Bucket: STAGING_BUCKET, Key: 'uploads/a/b.webp' });
  });
  it('distinguishes a missing upload from AWS permission or transport failures', async () => {
    send.mockRejectedValueOnce({ name: 'NotFound', $metadata: { httpStatusCode: 404 } });
    await expect(storage.head('uploads/a/b.webp')).rejects.toBeInstanceOf(ConflictException);
    send.mockRejectedValueOnce({ name: 'AccessDenied', $metadata: { httpStatusCode: 403 } });
    await expect(storage.head('uploads/a/b.webp')).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
  it('reads a bounded source stream and always releases it', async () => {
    const body = Readable.from([Buffer.from('source')]);
    send.mockResolvedValue({ ContentLength: 6, ContentType: 'image/png', Body: body });
    await expect(storage.readSource('uploads/a/b.png', 6, 'image/png')).resolves.toEqual(Buffer.from('source'));
    expect(send.mock.calls[0][0]).toBeInstanceOf(GetObjectCommand);
    expect(send.mock.calls[0][0].input).toEqual({ Bucket: STAGING_BUCKET, Key: 'uploads/a/b.png' });
    expect(body.destroyed).toBe(true);
  });
  it('aborts oversized sources from metadata or the actual byte stream', async () => {
    const oversized = Readable.from([Buffer.alloc(MAX_UPLOAD_BYTES + 1)]);
    send.mockResolvedValueOnce({ ContentLength: MAX_UPLOAD_BYTES + 1, ContentType: 'image/png', Body: oversized });
    await expect(storage.readSource('uploads/a/b.png', 1, 'image/png')).rejects.toMatchObject({ status: 413 });
    expect(oversized.destroyed).toBe(true);
    const misleading = Readable.from([Buffer.alloc(MAX_UPLOAD_BYTES + 1)]);
    send.mockResolvedValueOnce({ ContentLength: 1, ContentType: 'image/png', Body: misleading });
    await expect(storage.readSource('uploads/a/b.png', 1, 'image/png')).rejects.toMatchObject({ status: 413 });
    expect(misleading.destroyed).toBe(true);
  });
  it('rejects incomplete sources or unexpected source content types', async () => {
    send.mockResolvedValueOnce({ ContentLength: 10, ContentType: 'image/png', Body: Readable.from([Buffer.from('short')]) });
    await expect(storage.readSource('uploads/a/b.png', 10, 'image/png')).rejects.toMatchObject({ status: 422 });
    send.mockResolvedValueOnce({ ContentLength: 10, ContentType: 'image/jpeg', Body: Readable.from([]) });
    await expect(storage.readSource('uploads/a/b.png', 10, 'image/png')).rejects.toMatchObject({ status: 422 });
  });
  it('sanitizes failed source reads and output writes', async () => {
    send.mockRejectedValue(new Error('private S3 location'));
    await expect(storage.readSource('uploads/a/b.png', 10, 'image/png')).rejects.toThrow('Source image could not be retrieved');
    await expect(storage.writeProcessed('processed/a/b.webp', Buffer.from('test'))).rejects.toThrow('Processed image could not be stored');
  });
  it('stores only private WebP objects in staging', async () => {
    send.mockResolvedValue({});
    await storage.writeProcessed('processed/a/b.webp', Buffer.from('webp'));
    const command = send.mock.calls[0][0];
    expect(command).toBeInstanceOf(PutObjectCommand);
    expect(command.input).toMatchObject({ Bucket: STAGING_BUCKET, ContentType: 'image/webp', IfNoneMatch: '*', CacheControl: 'private, no-store' });
    expect(command.input).not.toHaveProperty('ACL');
  });
  it('attempts cleanup of every partial output and reports failures without throwing', async () => {
    send.mockRejectedValueOnce(new Error('denied')).mockResolvedValueOnce({});
    await expect(storage.cleanupProcessed(['processed/a/full.webp', 'processed/a/thumb.webp'])).resolves.toBe(false);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls.every(([command]) => command instanceof DeleteObjectCommand && command.input.Bucket === STAGING_BUCKET)).toBe(true);
  });
});
