import { IsIn, IsInt, IsOptional, IsString, IsUUID, Length, Matches, Max, Min } from 'class-validator';

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export class CreateUploadDto {
  @IsOptional()
  @IsUUID('4')
  requestId?: string;

  @IsString()
  @Length(1, 180)
  @Matches(/^[^\\/\u0000-\u001f\u007f]+\.(?:jpe?g|png|webp)$/i)
  filename!: string;

  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  mimeType!: 'image/jpeg' | 'image/png' | 'image/webp';

  @IsInt()
  @Min(1)
  @Max(MAX_UPLOAD_BYTES)
  sizeBytes!: number;
}
