import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationQueryDto } from '../base.dto';

export class AddReviewDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  rating: number;

  // @AutoMap()
  // @ApiProperty({ required: true })
  // @IsNotEmpty()
  // @Type(() => Number)
  // @IsInt()
  // userId: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  productId: number;
}

export class UpdateReviewDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rating: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId: number;
}

export class ReviewQueryDto extends BasePaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId?: number;
}

export class ReviewStatisticsDto {
  totalReviews: number;
  averageRating: number;
  ratingStatistics: Record<number, number>;
}
