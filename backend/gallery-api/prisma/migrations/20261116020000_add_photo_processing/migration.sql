-- Keep the source key and existing photo relationships intact.
ALTER TABLE "Photo"
  ADD COLUMN "processedKey" TEXT,
  ADD COLUMN "thumbnailKey" TEXT,
  ADD COLUMN "processedSizeBytes" INTEGER,
  ADD COLUMN "thumbnailSizeBytes" INTEGER,
  ADD COLUMN "processedAt" TIMESTAMP(3),
  ADD COLUMN "processingError" TEXT;
