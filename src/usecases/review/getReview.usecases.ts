import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewM } from '@/domain/model/review';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';

export class GetReviewUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
  ) {}

  async execute(id: number): Promise<ReviewM> {
    this.logger.log('GetReviewUseCases execute', 'Geting order by ID');
    return this.reviewRepo.findById(id);
  }
}
