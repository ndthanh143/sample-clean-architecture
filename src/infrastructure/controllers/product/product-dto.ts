import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';

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
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsInt()
  categoryId: number | null = null;
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
  @IsOptional()
  @IsNumber()
  price?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  stock?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  categoryId?: number | null = null;
}

export class ProductQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
}
