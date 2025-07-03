import { ProductPlanM } from '@/domain/model/product-plan';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';

export class GetProductPlanUseCases {
  constructor(private readonly repo: ProductPlanRepository) {}

  async execute(id: number): Promise<ProductPlanM> {
    return await this.repo.findById(id);
  }
}
