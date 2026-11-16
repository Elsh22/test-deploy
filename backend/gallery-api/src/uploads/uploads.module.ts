import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { StagingStorageService } from './staging-storage.service';
import { SharpImageService } from './sharp-image.service';
import { ImageProcessingService } from './image-processing.service';
import { PhotoPreviewService } from './photo-preview.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UploadsController],
  providers: [UploadsService, StagingStorageService, SharpImageService, ImageProcessingService, PhotoPreviewService, JwtAuthGuard, RolesGuard],
})
export class UploadsModule {}
