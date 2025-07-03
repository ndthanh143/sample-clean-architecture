import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewM } from '@/domain/model/review';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { UpdateReviewDto } from '@/infrastructure/controllers/review/review.dto';
import { Mapper } from '@automapper/core';

export class UpdateReviewUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateReviewDto) {
    const item = this.mapper.map(payload, UpdateReviewDto, ReviewM);
    this.logger.log('UpdateReviewUseCases execute', 'Updating order');

    return this.reviewRepo.updateById(id, item);
  }
}
