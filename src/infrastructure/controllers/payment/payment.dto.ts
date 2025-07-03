import { PaymentMethod } from '@/utils';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateIntentDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  amount: number;
}

export class AddPaymentDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  amount: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;
}
