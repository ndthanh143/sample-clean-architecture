import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { createPaginationMeta } from '@/utils';
import { Mapper } from '@automapper/core';

export class GetReviewsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(page: number, litmit: number, productId: number) {
    const [data, total] = await this.reviewRepo.findAll(page, litmit, productId);
    this.logger.log('GetReviewsUseCases execute', 'Geting review by productId');

    return {
      data,
      meta: createPaginationMeta(total, page, litmit),
    };
  }
}
