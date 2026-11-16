
import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('api/albums')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
  ) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':slug')
  @Header('Cache-Control', 'no-store')
  async findOne(@Param('slug') slug: string) {
    const album = await this.albumsService.findOne(slug);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }
}
