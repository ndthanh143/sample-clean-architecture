import { ILogger } from '../../domain/logger/logger.interface';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';

export class DeleteProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteProductUseCases execute', `Item ${id} have been deleted`);
  }
}
