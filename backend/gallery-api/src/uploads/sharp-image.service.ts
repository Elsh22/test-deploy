import { Injectable, PayloadTooLargeException, UnprocessableEntityException } from '@nestjs/common';
import sharp, { type SharpOptions } from 'sharp';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';

export const MAX_IMAGE_PIXELS = 24_000_000;
export const MAX_IMAGE_DIMENSION = 8192;
const options: SharpOptions = {
  limitInputPixels: MAX_IMAGE_PIXELS,
  failOn: 'warning',
  sequentialRead: true,
  unlimited: false,
};

@Injectable()
export class SharpImageService {
  constructor() {
    sharp.cache({ memory: 16, files: 0, items: 16 });
    sharp.concurrency(1);
  }

  async render(source: Buffer, expectedMime: string) {
    if (source.length > MAX_UPLOAD_BYTES) {
      throw new PayloadTooLargeException('Source image exceeds the permitted byte limit');
    }
    // Avoid invoking unrelated decoders (e.g. SVG/TIFF). A matching signature
    // is only a preflight; full pixel decoding below is still mandatory.
    const supportedSignature =
      source.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) ||
      source.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ||
      (source.subarray(0, 4).toString('ascii') === 'RIFF' && source.subarray(8, 12).toString('ascii') === 'WEBP');
    if (!supportedSignature) throw new UnprocessableEntityException('Unsupported or malformed image');
    try {
      const metadata = await sharp(source, options).metadata();
      const types: Record<string, string> = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
      if (!metadata.format || !types[metadata.format] || types[metadata.format] !== expectedMime ||
          (metadata.pages ?? 1) !== 1 || (metadata.channels ?? 0) > 4) {
        throw new UnprocessableEntityException('Only single-frame JPEG, PNG, and WebP images are supported');
      }
      if (!metadata.width || !metadata.height || metadata.width > MAX_IMAGE_DIMENSION ||
          metadata.height > MAX_IMAGE_DIMENSION || metadata.width * metadata.height > MAX_IMAGE_PIXELS) {
        throw new PayloadTooLargeException('Image dimensions exceed processing limits');
      }
      // toBuffer fully decodes pixels; metadata alone is not image validation.
      // Sharp strips metadata by default; do not use keepMetadata/withMetadata.
      const full = await sharp(source, options).autoOrient()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 }).timeout({ seconds: 10 }).toBuffer({ resolveWithObject: true });
      const thumbnail = await sharp(source, options).autoOrient()
        .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 }).timeout({ seconds: 10 }).toBuffer({ resolveWithObject: true });
      return { full, thumbnail };
    } catch (error) {
      if (error instanceof PayloadTooLargeException || error instanceof UnprocessableEntityException) throw error;
      throw new UnprocessableEntityException('Image could not be safely decoded');
    }
  }
}
