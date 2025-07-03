import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';

export class AddBlogCategoryDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug: string;
}

export class UpdateBlogCategoryDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug: string;
}

export class BlogCategoryQueryDto extends BasePaginationQueryDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string | null;
}
