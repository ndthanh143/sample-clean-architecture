import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { ProductSortBy } from '@/infrastructure/repositories/product.repository';
import { createPaginationMeta } from '@/utils';

export class GetProductsUseCases {
  constructor(private readonly repo: ProductRepository) {}

  async execute(
    page = 1,
    limit = 10,
    categoryId?: number,
    q?: string,
    sortBy?: ProductSortBy,
    minPrice?: number,
    maxPrice?: number,
  ) {
    const [data, total] = await this.repo.findAllPublished(
      page,
      limit,
      categoryId,
      q,
      sortBy,
      minPrice,
      maxPrice,
    );

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }

  async executeForAdmin(
    page = 1,
    limit = 10,
    categoryId?: number,
    q?: string,
    sortBy?: ProductSortBy,
    minPrice?: number,
    maxPrice?: number,
  ) {
    const [data, total] = await this.repo.findAll(
      page,
      limit,
      categoryId,
      q,
      sortBy,
      minPrice,
      maxPrice,
    );

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }

  async executeGetRelative(page = 1, limit = 10, slug: string) {
    const [data, total] = await this.repo.findRelativeProducts(page, limit, slug);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
