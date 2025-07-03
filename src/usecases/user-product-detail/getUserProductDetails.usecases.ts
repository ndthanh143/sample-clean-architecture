import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';
import { AccountSortBy } from '@/infrastructure/controllers/user-product-detail/user-product-detail.dto';
import { createPaginationMeta } from '@/utils';

export class GetUserProductDetailsUseCases {
  constructor(private readonly repo: UserProductDetailRepository) {}

  async execute(page = 1, limit = 10, userId?: number, productDetailId?: number) {
    const [data, total] = await this.repo.findAll(page, limit, userId, productDetailId);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }

  async executeAndHandleExpired({
    page = 1,
    limit = 10,
    userId,
    productDetailId,
    status,
    q,
    sortBy,
  }: {
    page: number;
    limit: number;
    userId?: number;
    productDetailId?: number;
    status?: 'expired' | 'active';
    q?: string;
    sortBy?: AccountSortBy;
  }) {
    const [data, total] = await this.repo.findAllAndHandleExipred(
      page,
      limit,
      userId,
      productDetailId,
      status,
      q,
      sortBy,
    );

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
