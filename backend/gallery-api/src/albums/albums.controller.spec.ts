import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

describe('AlbumsController', () => {
  let controller: AlbumsController;
  const albums = { findAll: jest.fn(), findOne: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module = await Test.createTestingModule({
      controllers: [AlbumsController],
      providers: [{ provide: AlbumsService, useValue: albums }],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  it('returns an empty list when there are no published albums', async () => {
    albums.findAll.mockResolvedValue([]);
    await expect(controller.findAll()).resolves.toEqual([]);
  });

  it('returns a published album by slug', async () => {
    const album = { slug: 'published', photos: [] };
    albums.findOne.mockResolvedValue(album);
    await expect(controller.findOne('published')).resolves.toEqual(album);
    expect(albums.findOne).toHaveBeenCalledWith('published');
  });

  it('returns 404 for an unknown or unpublished album', async () => {
    albums.findOne.mockResolvedValue(null);
    await expect(controller.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('propagates failures instead of presenting them as empty results', async () => {
    albums.findAll.mockRejectedValue(new Error('Database unavailable'));
    await expect(controller.findAll()).rejects.toThrow('Database unavailable');
  });
});
