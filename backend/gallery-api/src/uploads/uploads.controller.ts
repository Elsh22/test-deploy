import { Body, Controller, Get, Header, HttpCode, Param, ParseUUIDPipe, Post, Req, StreamableFile, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UploadsService, type UploadAdmin } from './uploads.service';
import { ImageProcessingService } from './image-processing.service';
import { PhotoPreviewService } from './photo-preview.service';

type AdminRequest = Request & { admin: UploadAdmin };

@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class UploadsController {
  constructor(private readonly uploads: UploadsService, private readonly processing: ImageProcessingService,
    private readonly previews: PhotoPreviewService) {}

  @Get('photos/:photoId/preview')
  @Header('Cache-Control', 'private, no-store')
  @Header('X-Content-Type-Options', 'nosniff')
  async preview(@Param('photoId', new ParseUUIDPipe({ version: '4' })) photoId: string, @Req() request: AdminRequest) {
    const bytes = await this.previews.thumbnail(photoId, request.admin);
    return new StreamableFile(bytes, { type: 'image/webp', disposition: 'inline', length: bytes.length });
  }

  @Post('albums/:albumId/uploads')
  @Header('Cache-Control', 'no-store')
  create(@Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
    @Body() dto: CreateUploadDto, @Req() request: AdminRequest) {
    return this.uploads.create(albumId, dto, request.admin);
  }

  @Post('photos/:photoId/complete')
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  complete(@Param('photoId', new ParseUUIDPipe({ version: '4' })) photoId: string,
    @Req() request: AdminRequest) {
    return this.uploads.complete(photoId, request.admin);
  }

  @Post('photos/:photoId/process')
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  process(@Param('photoId', new ParseUUIDPipe({ version: '4' })) photoId: string,
    @Req() request: AdminRequest) {
    return this.processing.process(photoId, request.admin);
  }
}
