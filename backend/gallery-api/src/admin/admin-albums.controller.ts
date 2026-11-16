import { Body, Controller, Get, Header, HttpCode, Param, ParseUUIDPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminAlbumsService } from './admin-albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CoverPhotoDto, OrderPhotosDto, PublishAlbumDto, UpdateAlbumDto } from './dto/manage-album.dto';
import type { UploadAdmin } from '../uploads/uploads.service';

type AdminRequest = Request & { admin: UploadAdmin };
const albumIdPipe = new ParseUUIDPipe({ version: '4' });

@Controller('api/admin/albums')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class AdminAlbumsController {
  constructor(private readonly albumsService: AdminAlbumsService) {}

  @Post()
  create(@Body() dto: CreateAlbumDto, @Req() request: AdminRequest) {
    return this.albumsService.create(dto, request.admin.id);
  }
  @Get()
  @Header('Cache-Control', 'no-store')
  findAll(@Req() request: AdminRequest) { return this.albumsService.findAll(request.admin); }

  @Get(':albumId')
  @Header('Cache-Control', 'no-store')
  findOne(@Param('albumId', albumIdPipe) id: string, @Req() request: AdminRequest) {
    return this.albumsService.findOne(id, request.admin);
  }
  @Patch(':albumId')
  update(@Param('albumId', albumIdPipe) id: string, @Body() dto: UpdateAlbumDto, @Req() request: AdminRequest) {
    return this.albumsService.update(id, dto, request.admin);
  }
  @Put(':albumId/photos/order')
  reorder(@Param('albumId', albumIdPipe) id: string, @Body() dto: OrderPhotosDto, @Req() request: AdminRequest) {
    return this.albumsService.reorder(id, dto.photoIds, request.admin);
  }
  @Put(':albumId/cover')
  cover(@Param('albumId', albumIdPipe) id: string, @Body() dto: CoverPhotoDto, @Req() request: AdminRequest) {
    return this.albumsService.cover(id, dto.photoId, request.admin);
  }
  @Post(':albumId/publish')
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  publish(@Param('albumId', albumIdPipe) id: string, @Body() dto: PublishAlbumDto, @Req() request: AdminRequest) {
    return this.albumsService.publish(id, dto ?? {}, request.admin);
  }
  @Post(':albumId/archive')
  @HttpCode(200)
  archive(@Param('albumId', albumIdPipe) id: string, @Req() request: AdminRequest) {
    return this.albumsService.archive(id, request.admin);
  }
}
