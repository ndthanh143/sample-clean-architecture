import { ReviewM } from '../model/review';

export interface ReviewRepository {
  insert(data: ReviewM): Promise<ReviewM>;
  findAll(page: number, limit: number, productId: number): Promise<[ReviewM[], number]>;
  getStatisticsByProductId(productId: number): Promise<{
    totalReviews: number;
    averageRating: number;
    ratingStatistics: Record<number, number>;
  }>;
  findById(id: number): Promise<ReviewM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: ReviewM): Promise<void>;
}
