import { ProductVariantM } from '@/domain/model/product-variant';
import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';

export class GetProductVariantUseCases {
  constructor(private readonly repo: ProductVariantRepository) {}

  async execute(id: number): Promise<ProductVariantM> {
    return await this.repo.findById(id);
  }
}
