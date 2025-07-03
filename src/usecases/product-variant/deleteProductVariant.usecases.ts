import { ILogger } from '@/domain/logger/logger.interface';
import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';

export class DeleteProductVariantUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductVariantRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
    this.logger.log(
      'DeleteProductVariantUseCases execute',
      `Product Variant ${id} have been deleted`,
    );
  }
}
