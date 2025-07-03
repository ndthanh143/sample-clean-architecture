import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddProductPlanDto, UpdateProductPlanDto } from '../product-plan/product-plan.dto';

export class AddProductVariantDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  maximumShare: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean = true;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  productPlans: AddProductPlanDto[] = [];
}

export class UpdateProductVariantDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsInt()
  maximumShare?: number;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  stock?: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean = true;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  plans: UpdateProductPlanDto[] = [];
}
