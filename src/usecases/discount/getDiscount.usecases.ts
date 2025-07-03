import { DiscountM } from '@/domain/model/discount';
import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';

export class GetDiscountUseCases {
  constructor(private readonly repo: DiscountRepository) {}

  async execute(id: number): Promise<DiscountM> {
    return await this.repo.findById(id);
  }
}
