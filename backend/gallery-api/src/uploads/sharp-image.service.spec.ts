import sharp from 'sharp';
import { SharpImageService, MAX_IMAGE_DIMENSION } from './sharp-image.service';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';

const create = (width: number, height: number) => sharp({ create: {
  width, height, channels: 3, background: '#facc15',
} });

describe('SharpImageService (real decoder)', () => {
  const service = new SharpImageService();
  it.each(['jpeg', 'png', 'webp'] as const)('decodes a real %s and produces WebP without enlarging', async (format) => {
    const source = await create(120, 80).toFormat(format).toBuffer();
    const outputs = await service.render(source, `image/${format}`);
    for (const image of [outputs.full, outputs.thumbnail]) {
      const metadata = await sharp(image.data).metadata();
      expect(metadata).toMatchObject({ format: 'webp', width: 120, height: 80 });
      expect(metadata.exif).toBeUndefined();
      expect(metadata.icc).toBeUndefined();
    }
  });
  it.each([[2400, 1200, 1920, 960, 480, 240], [1200, 2400, 960, 1920, 240, 480]])(
    'preserves aspect ratio for %ix%i images', async (width, height, fw, fh, tw, th) => {
      const outputs = await service.render(await create(width, height).png().toBuffer(), 'image/png');
      expect(outputs.full.info).toMatchObject({ width: fw, height: fh });
      expect(outputs.thumbnail.info).toMatchObject({ width: tw, height: th });
    });
  it('corrects EXIF orientation and strips metadata from both outputs', async () => {
    const source = await create(80, 40).jpeg().withMetadata({ orientation: 6 }).toBuffer();
    const outputs = await service.render(source, 'image/jpeg');
    for (const image of [outputs.full, outputs.thumbnail]) {
      const metadata = await sharp(image.data).metadata();
      expect(metadata).toMatchObject({ width: 40, height: 80, format: 'webp' });
      expect(metadata.orientation).toBeUndefined();
      expect(metadata.exif).toBeUndefined();
      expect(metadata.icc).toBeUndefined();
    }
  });
  it('rejects corrupt bytes and truncated images even if a header can be read', async () => {
    await expect(service.render(Buffer.from('not an image'), 'image/jpeg')).rejects.toMatchObject({ status: 422 });
    const source = await create(500, 500).jpeg().toBuffer();
    await expect(service.render(source.subarray(0, source.length - 60), 'image/jpeg')).rejects.toMatchObject({ status: 422 });
  });
  it('rejects a supported image with a mismatched declared content type', async () => {
    await expect(service.render(await create(10, 10).png().toBuffer(), 'image/jpeg')).rejects.toMatchObject({ status: 422 });
  });
  it('rejects SVG and TIFF content regardless of extension', async () => {
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>');
    await expect(service.render(svg, 'image/png')).rejects.toMatchObject({ status: 422 });
    await expect(service.render(await create(10, 10).tiff().toBuffer(), 'image/png')).rejects.toMatchObject({ status: 422 });
  });
  it('rejects oversized dimensions and decompression bombs', async () => {
    await expect(service.render(await create(MAX_IMAGE_DIMENSION + 1, 1).png().toBuffer(), 'image/png')).rejects.toMatchObject({ status: 413 });
    await expect(service.render(await create(5000, 5000).png().toBuffer(), 'image/png')).rejects.toMatchObject({ status: 422 });
  });
  it('rejects sources exceeding the compressed-byte limit before decoding', async () => {
    await expect(service.render(Buffer.alloc(MAX_UPLOAD_BYTES + 1), 'image/png')).rejects.toMatchObject({ status: 413 });
  });
});
