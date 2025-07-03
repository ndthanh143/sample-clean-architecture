import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddProductPlanDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  durationMonths: number | null = null;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean = true;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsInt()
  productVariantId?: number;
}

export class UpdateProductPlanDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  durationMonths?: number | null = null;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean = true;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  productVariantId?: number;
}
