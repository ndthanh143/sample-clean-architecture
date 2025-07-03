import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { Mapper } from '@automapper/core';

export class DeleteReviewUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number) {
    this.logger.log('DeleteReviewUseCases execute', 'Deleting review by ID');

    return this.reviewRepo.deleteById(id);
  }
}
