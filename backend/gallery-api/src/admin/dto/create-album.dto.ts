
import {
  IsString,
  IsOptional,
  IsISO8601,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAlbumDto {
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @Length(3, 150)
  title!: string;

  @IsString()
  @Length(1, 120)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string;

  @IsOptional()
  @IsISO8601()
  eventDate?: string;
}
