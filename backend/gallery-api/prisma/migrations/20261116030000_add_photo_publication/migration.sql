-- Publication does not replace private source/processed metadata.
ALTER TABLE "Photo"
  ADD COLUMN "publishedKey" TEXT,
  ADD COLUMN "publishedThumbnailKey" TEXT;
