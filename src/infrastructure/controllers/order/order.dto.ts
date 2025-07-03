import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationQueryDto } from '../base.dto';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@/utils';
import { AddPaymentDto } from '../payment/payment.dto';
import { AutoMap } from '@automapper/classes';

class AddOrderItemDto {
  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productVariantId: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productPlanId: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  priceAtPurchase: number;
}

export class AddOrderDto {
  @AutoMap()
  @ApiProperty({ type: [AddOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddOrderItemDto)
  @IsNotEmpty()
  items: AddOrderItemDto[];

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  note?: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  payment: AddPaymentDto;
}

export class UpdateOrderDto {}

export class OrderQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentCode?: string;
}

export class MyOrderQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;
}
