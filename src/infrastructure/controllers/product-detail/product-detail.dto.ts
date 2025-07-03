import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';
import { AddProductVariantDto } from '../product-variant/product-variant.dto';

export class AddProductDetailDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  productId?: number | null = null;
}

export class UpdateProductDetailDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  productId?: number | null = null;
}

export class ProductDetailQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  variantId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;
}
