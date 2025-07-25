import { ProductM } from '@/domain/model/product';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';

export class GetProductUseCases {
  constructor(private readonly repo: ProductRepository) {}

  async executeById(id: number): Promise<ProductM> {
    return await this.repo.findById(id);
  }

  async executeBySlug(slug: string): Promise<ProductM> {
    return await this.repo.findBySlug(slug);
  }
}
