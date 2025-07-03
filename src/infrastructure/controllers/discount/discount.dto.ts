import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AddDiscountDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  percentage: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

export class UpdateDiscountDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  percentage?: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
