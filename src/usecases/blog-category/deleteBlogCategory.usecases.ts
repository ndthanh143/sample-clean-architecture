import { ILogger } from '../../domain/logger/logger.interface';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';

export class DeleteBlogCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: BlogCategoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteBlogCategoryUseCases execute', `Item ${id} have been deleted`);
  }
}
