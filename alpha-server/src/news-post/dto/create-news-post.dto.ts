import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsDateString,
  MaxLength,
  ArrayMaxSize
} from 'class-validator';
import { FeaturedImageDto } from './featured-image.dto';

export enum NewsPostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export class CreateNewsPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  slug: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  summary?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  author: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  tags?: string[];

  @IsEnum(NewsPostStatus)
  @IsOptional()
  status?: NewsPostStatus;

  @IsDateString()
  @IsOptional()
  publishedAt?: string;

  @IsBoolean()
  @IsOptional()
  isBreaking?: boolean;

  @IsOptional()
  featuredImage?: FeaturedImageDto;

}

export class PublishPostDto {
  @IsString()
  @IsNotEmpty()
  postId: string;
}


export class NewsFilterDto {
  @IsString()
  @IsOptional()
  search?: string;

  // filter by category

  @IsString()
  @IsOptional()
  category?: string;

  // filter by tags

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  tags?: string[];

  // pagination
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

