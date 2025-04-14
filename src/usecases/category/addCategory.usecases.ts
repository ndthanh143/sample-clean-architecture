import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { ILogger } from '@/domain/logger/logger.interface';
import { CategoryM } from '@/domain/model/category';
import { AddCategoryDto } from '@/infrastructure/controllers/category/category-dto';
import { Mapper } from '@automapper/core';

export class addCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: CategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddCategoryDto): Promise<CategoryM> {
    const item = this.mapper.map(payload, AddCategoryDto, CategoryM);
    const result = await this.repo.insert(item);
    this.logger.log('addCategoryUseCases execute', 'New item have been inserted');
    return result;
  }
}
