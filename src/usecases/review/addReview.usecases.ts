import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewM } from '@/domain/model/review';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { AddReviewDto } from '@/infrastructure/controllers/review/review.dto';
import { Mapper } from '@automapper/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AddReviewUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
    private readonly productRepo: ProductRepository,
    private readonly userRepo: UserRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(userId: number, dto: AddReviewDto): Promise<ReviewM> {
    const { productId } = dto;

    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      this.logger.error('AddReviewUseCases execute', 'User not found');
      throw new NotFoundException('User not found');
    }
    const product = await this.productRepo.findById(productId);
    if (!product) {
      this.logger.error('AddReviewUseCases execute', 'Product not found');
      throw new NotFoundException('Product not found');
    }
    const review = this.mapper.map(dto, AddReviewDto, ReviewM);
    review.user = user;
    review.product = product;
    const insertedReview = await this.reviewRepo.insert(review);

    this.logger.log('AddReviewUseCases execute', 'New item have been inserted');

    return insertedReview;
  }
}
