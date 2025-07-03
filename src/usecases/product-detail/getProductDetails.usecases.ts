import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { createPaginationMeta } from '@/utils';

export class GetProductDetailsUseCases {
  constructor(private readonly repo: ProductDetailRepository) {}

  async execute(page = 1, limit = 10, productId?: number, q?: string) {
    const [data, total] = await this.repo.findAll(page, limit, productId, q);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }

  async executeGetForGranting(
    page = 1,
    limit = 10,
    productId?: number,
    variantId?: number,
    q?: string,
    userId?: number,
  ) {
    const [data, total] = await this.repo.findAllForGranting(
      page,
      limit,
      productId,
      variantId,
      q,
      userId,
    );

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
