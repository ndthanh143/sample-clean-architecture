import { ProductPlanM } from '@/domain/model/product-plan';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';
import { createPaginationMeta } from '@/utils';

export class GetProductPlansUseCases {
  constructor(private readonly repo: ProductPlanRepository) {}

  //   async execute(page = 1, limit = 10) {
  //     const [data, total] = await this.repo.findAll(page, limit);

  //     return {
  //       data,
  //       meta: createPaginationMeta(total, page, limit),
  //     };
  //   }

  async executeByVariantId(variantId: number): Promise<ProductPlanM[]> {
    return await this.repo.findByVariantId(variantId);
  }
}
