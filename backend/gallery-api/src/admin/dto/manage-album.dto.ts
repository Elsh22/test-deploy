import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsISO8601, IsOptional, IsString, IsUUID, Length, Matches, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @ValidateIf((_, value) => value !== undefined)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @Length(3, 150)
  title?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @Length(1, 120)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string | null;

  @IsOptional()
  @IsISO8601({ strict: true })
  eventDate?: string | null;
}

export class OrderPhotosDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  photoIds!: string[];
}

export class CoverPhotoDto {
  @IsUUID('4')
  photoId!: string;
}

export class PublishAlbumDto {
  @ValidateIf((_, value) => value !== undefined)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  photoIds?: string[];
}
