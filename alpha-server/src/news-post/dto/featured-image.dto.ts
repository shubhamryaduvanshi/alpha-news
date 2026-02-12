import { IsString, IsOptional, IsUrl } from 'class-validator';

export class FeaturedImageDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  alt?: string;
}
