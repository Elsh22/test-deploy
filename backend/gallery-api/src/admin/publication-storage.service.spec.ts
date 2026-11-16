import { CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PublicationStorageService, PRIVATE_BUCKET, PUBLISHED_BUCKET } from './publication-storage.service';

jest.mock('@aws-sdk/client-s3', () => ({ ...jest.requireActual('@aws-sdk/client-s3'), S3Client: jest.fn() }));
describe('PublicationStorageService', () => {
  const send = jest.fn(), destroy = jest.fn(); let storage: PublicationStorageService;
  beforeEach(() => {
    jest.resetAllMocks(); jest.mocked(S3Client).mockImplementation(() => ({ send, destroy }) as unknown as S3Client);
    storage = new PublicationStorageService();
  });
  afterEach(() => storage.onModuleDestroy());
  it('verifies source type, size, and ETag before copying', async () => {
    send.mockResolvedValueOnce({ ContentType: 'image/webp', ContentLength: 42, ETag: '"source"' });
    await expect(storage.source('processed/a/full.webp', 42)).resolves.toBe('"source"');
    expect(send.mock.calls[0][0]).toBeInstanceOf(HeadObjectCommand);
    expect(send.mock.calls[0][0].input.Bucket).toBe(PRIVATE_BUCKET);
  });
  it('rejects a missing or mismatched source and sanitizes AWS failures', async () => {
    send.mockRejectedValueOnce({ $metadata: { httpStatusCode: 404 } });
    await expect(storage.source('processed/a/full.webp', 42)).rejects.toMatchObject({ status: 409 });
    send.mockResolvedValueOnce({ ContentType: 'text/html', ContentLength: 42, ETag: 'etag' });
    await expect(storage.source('processed/a/full.webp', 42)).rejects.toMatchObject({ status: 409 });
    send.mockRejectedValueOnce(new Error('private AWS details'));
    await expect(storage.source('processed/a/full.webp', 42)).rejects.toThrow('verification is unavailable');
  });
  it('copies with a source precondition, no ACL, and verifies destination metadata', async () => {
    send.mockResolvedValueOnce({ CopyObjectResult: { ETag: '"copied"' } }).mockResolvedValueOnce({ ContentLength: 42, ContentType: 'image/webp' });
    await storage.transfer('processed/a/full.webp', 'Events/new/full.webp', 42, '"source"');
    const copy = send.mock.calls[0][0]; expect(copy).toBeInstanceOf(CopyObjectCommand);
    expect(copy.input).toMatchObject({ Bucket: PUBLISHED_BUCKET, CopySource: PRIVATE_BUCKET + '/processed/a/full.webp',
      CopySourceIfMatch: '"source"', ContentType: 'image/webp', MetadataDirective: 'REPLACE', TaggingDirective: 'REPLACE' });
    expect(copy.input).not.toHaveProperty('ACL');
    expect(send.mock.calls[1][0].input).toEqual({ Bucket: PUBLISHED_BUCKET, Key: 'Events/new/full.webp', IfMatch: '"copied"' });
  });
  it('does not treat an empty copy response or failed destination verification as success', async () => {
    send.mockResolvedValueOnce({});
    await expect(storage.transfer('processed/a/full.webp', 'Events/new/full.webp', 42, 'etag')).rejects.toMatchObject({ status: 503 });
    send.mockResolvedValueOnce({ CopyObjectResult: { ETag: 'etag' } }).mockResolvedValueOnce({ ContentLength: 41, ContentType: 'image/webp' });
    await expect(storage.transfer('processed/a/full.webp', 'Events/new/full.webp', 42, 'etag')).rejects.toMatchObject({ status: 503 });
  });
  it('cleans only explicitly attempted destination keys and reports partial failures', async () => {
    send.mockRejectedValueOnce(new Error('denied')).mockResolvedValueOnce({});
    await expect(storage.cleanup(['Events/a/full.webp', 'Events/a/thumbnail.webp'])).resolves.toBe(false);
    expect(send.mock.calls.every(([command]) => command instanceof DeleteObjectCommand && command.input.Bucket === PUBLISHED_BUCKET)).toBe(true);
  });
});
