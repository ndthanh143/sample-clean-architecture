import { ILogger } from '@/domain/logger/logger.interface';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { ReviewStatisticsDto } from '@/infrastructure/controllers/review/review.dto';

export class GetStatisticReviewProductUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly reviewRepo: ReviewRepository,
  ) {}

  async execute(id: number): Promise<ReviewStatisticsDto> {
    this.logger.log('GetStatisticReviewProductUsecases execute', 'Geting by product ID');
    return this.reviewRepo.getStatisticsByProductId(id);
  }
}
