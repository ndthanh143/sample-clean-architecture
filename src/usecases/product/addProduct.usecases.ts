import { ILogger } from '@/domain/logger/logger.interface';
import { ProductM } from '@/domain/model/product';
import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { AddProductDto } from '@/infrastructure/controllers/product/product-dto';
import { Mapper } from '@automapper/core';

export class AddProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepo: ProductRepository,
    private readonly cateRepo: CategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddProductDto): Promise<ProductM> {
    const item = this.mapper.map(payload, AddProductDto, ProductM);

    if (payload.categoryId) {
      const category = await this.cateRepo.findById(payload.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${payload.categoryId} not found`);
      }

      item.category = category;
    }

    const result = await this.productRepo.insert(item);
    this.logger.log('AddProductUseCases execute', 'New item have been inserted');
    return result;
  }
}
