import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { ProductM } from '@/domain/model/product';
import { UpdateProductDto } from '@/infrastructure/controllers/product/product-dto';
import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';

export class UpdateProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductRepository,
    private readonly cateRepo: CategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateProductDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateProductDto, ProductM);
    if (payload.categoryId) {
      const category = await this.cateRepo.findById(payload.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${payload.categoryId} not found`);
      }

      item.category = category;
    }
    this.repo.updateById(id, item);
    this.logger.log('UpdateCategoryUseCases execute', `Category ${id} have been updated`);
  }
}
