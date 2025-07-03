import { ILogger } from '@/domain/logger/logger.interface';
import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';

export class DeleteDiscountUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: DiscountRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
    this.logger.log('DeleteDiscountUseCases execute', `Discount ${id} deleted`);
  }
}
