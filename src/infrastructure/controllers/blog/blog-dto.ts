import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';

export class AddBlogDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug: string;
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  thumbnail: string | null;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsInt()
  readTime: number;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId: number;
}

export class UpdateBlogDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  readTime: number;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail: string | null;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId: number;
}

export class BlogQueryDto extends BasePaginationQueryDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string | null;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId: number | null;
}
