CREATE TABLE "RevokedAccessToken" (
    "tokenHash" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "RevokedAccessToken_expiresAt_idx" ON "RevokedAccessToken"("expiresAt");
CREATE TABLE "SecurityRateBucket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL
);
