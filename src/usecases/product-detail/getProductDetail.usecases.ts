import { ProductDetailM } from '@/domain/model/product-detail';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';

export class GetProductDetailUseCases {
  constructor(private readonly repo: ProductDetailRepository) {}

  async execute(id: number): Promise<ProductDetailM> {
    return await this.repo.findById(id);
  }
}
