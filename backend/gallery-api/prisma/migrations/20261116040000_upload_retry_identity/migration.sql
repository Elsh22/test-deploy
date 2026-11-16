ALTER TABLE "Photo" ADD COLUMN "uploadRequestId" TEXT;
CREATE UNIQUE INDEX "Photo_uploadRequestId_key" ON "Photo"("uploadRequestId");
