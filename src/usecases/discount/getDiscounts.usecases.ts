import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';
import { createPaginationMeta } from '@/utils';

export class GetDiscountsUseCases {
  constructor(private readonly repo: DiscountRepository) {}

  async execute(page = 1, limit = 10) {
    const [data, total] = await this.repo.findAll(page, limit);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
