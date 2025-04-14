import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UpdateCategoryDto } from '@/infrastructure/controllers/category/category-dto';
import { Mapper } from '@automapper/core';
import { CategoryM } from '@/domain/model/category';

export class UpdateCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: CategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateCategoryDto): Promise<void> {
    const categoryModel = this.mapper.map(payload, UpdateCategoryDto, CategoryM);
    this.repo.updateById(id, categoryModel);
    this.logger.log('UpdateCategoryUseCases execute', `Category ${id} have been updated`);
  }
}
