import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ReviewRepository } from '@/domain/repositories/reviewRepository.interface';
import { Review } from '../entities/review.entity';
import { ReviewM } from '@/domain/model/review';
import { ReviewStatisticsDto } from '../controllers/review/review.dto';

@Injectable()
export class DatabaseReviewRepository implements ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(review: ReviewM): Promise<ReviewM> {
    const entity = this.mapper.map(review, ReviewM, Review);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, Review, ReviewM);
  }

  async findAll(page: number, limit: number, productId?: number): Promise<[ReviewM[], number]> {
    const qb = this.repository.createQueryBuilder('review');

    if (productId) {
      qb.andWhere('review.product_id = :productId', { productId });
    }

    qb.leftJoinAndSelect('review.user', 'user');

    qb.orderBy('review.createdDate', 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Review, ReviewM);
    return [mapped, total];
  }

  async getStatisticsByProductId(productId: number): Promise<ReviewStatisticsDto> {
    const qb = this.repository.createQueryBuilder('review');
    qb.select('AVG(review.rating)', 'averageRating');
    qb.addSelect('COUNT(review.id)', 'totalReviews');
    qb.where('review.product_id = :productId', { productId });

    const result = await qb.getRawOne();

    // Query to get count per rating (1 to 5)
    const ratingCounts = await this.repository
      .createQueryBuilder('review')
      .select('review.rating', 'rating')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.product_id = :productId', { productId })
      .groupBy('review.rating')
      .getRawMany();

    const ratingStatistics: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const item of ratingCounts) {
      const rating = parseInt(item.rating, 10);
      const count = parseInt(item.count, 10);
      ratingStatistics[rating] = count;
    }

    return {
      averageRating: parseFloat(result.averageRating ?? 0),
      totalReviews: parseInt(result.totalReviews, 10) || 0,
      ratingStatistics,
    };
  }

  async findById(id: number): Promise<ReviewM> {
    const qb = this.repository.createQueryBuilder('review');
    qb.where('review.id = :id', { id });
    qb.leftJoinAndSelect('review.user', 'user');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return this.mapper.map(entity, Review, ReviewM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, data: ReviewM): Promise<void> {
    const entity = this.mapper.map(data, ReviewM, Review);
    await this.repository.update({ id }, entity);
  }
}
