import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';
import { DiscountM } from '@/domain/model/discount';
import { AddDiscountDto } from '@/infrastructure/controllers/discount/discount.dto';

export class AddDiscountUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly discountRepo: DiscountRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddDiscountDto): Promise<DiscountM> {
    const item = this.mapper.map(payload, AddDiscountDto, DiscountM);

    const result = await this.discountRepo.insert(item);
    this.logger.log('AddDiscountUseCases execute', 'New Discount has been created');
    return result;
  }
}
