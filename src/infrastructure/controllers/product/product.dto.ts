import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';
import { AddProductVariantDto } from '../product-variant/product-variant.dto';
import { ProductVariantM } from '@/domain/model/product-variant';
import { ProductSortBy } from '@/infrastructure/repositories/product.repository';

export class AddProductDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl: string | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPublished: boolean | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsInt()
  categoryId: number | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  productVariants: AddProductVariantDto[] = [];
}

export class UpdateProductDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl: string | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPublished: boolean | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId?: number | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  productVariants: ProductVariantM[] = [];
}

export class ProductQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: ProductSortBy;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;
}

export class ProductSearchQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  q: string;
}
