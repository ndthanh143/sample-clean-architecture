import { BlogRepository } from '@/domain/repositories/blogRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class DeleteBlogUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: BlogRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteBlogUseCases execute', `Item ${id} have been deleted`);
  }
}
