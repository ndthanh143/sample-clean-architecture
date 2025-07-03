import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class DeleteProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductDetailRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteProductDetailUseCases execute', `Item ${id} have been deleted`);
  }
}
