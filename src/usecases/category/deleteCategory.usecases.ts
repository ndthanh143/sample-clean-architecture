import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class DeleteCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: CategoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteCategoryUseCases execute', `Item ${id} have been deleted`);
  }
}
