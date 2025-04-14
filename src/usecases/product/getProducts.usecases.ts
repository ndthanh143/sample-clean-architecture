import { ProductM } from '@/domain/model/product';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';

export class GetProductsUseCases {
  constructor(private readonly repo: ProductRepository) {}

  async execute(page: number, limit: number, categoryId: number): Promise<ProductM[]> {
    return await this.repo.findAll(page, limit, categoryId);
  }
}
