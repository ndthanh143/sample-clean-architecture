import { ILogger } from '@/domain/logger/logger.interface';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';

export class DeleteProductPlanUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductPlanRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
    this.logger.log('DeleteProductPlanUseCases execute', `Product Plan ${id} have been deleted`);
  }
}
