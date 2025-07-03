import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';
import { createPaginationMeta } from '@/utils';

export class GetProductVariantsUseCases {
  constructor(private readonly repo: ProductVariantRepository) {}

  async execute(page = 1, limit = 10) {
    const [data, total] = await this.repo.findAll(page, limit);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
