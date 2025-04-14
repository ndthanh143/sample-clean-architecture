import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { CategoryM } from '@/domain/model/category';

export class GetCategoryUseCases {
  constructor(private readonly repo: CategoryRepository) {}

  async execute(id: number): Promise<CategoryM> {
    return await this.repo.findById(id);
  }
}
