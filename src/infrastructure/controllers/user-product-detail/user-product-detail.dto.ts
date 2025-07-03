import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';

export class AddUserProductDetailDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  expiredDate: Date;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  productDetailId: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  orderId: number;
}

export class UpdateUserProductDetailDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  startDate: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  expiredDate: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  productDetailId: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  userId: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  orderId: number;
}

export class UserProductDetailQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: 'expired' | 'active';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: AccountSortBy;
}

export type AccountSortBy = 'date-asc' | 'date-desc';
