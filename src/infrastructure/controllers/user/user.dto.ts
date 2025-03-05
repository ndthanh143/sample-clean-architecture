import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
