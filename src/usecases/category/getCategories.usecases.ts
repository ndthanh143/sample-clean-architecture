import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { CategoryM } from '@/domain/model/category';

export class GetCategoriesUseCases {
  constructor(private readonly repo: CategoryRepository) {}

  async execute(): Promise<CategoryM[]> {
    return await this.repo.findAll();
  }
}
