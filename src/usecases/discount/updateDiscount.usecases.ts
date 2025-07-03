import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';
import { DiscountM } from '@/domain/model/discount';
import { UpdateDiscountDto } from '@/infrastructure/controllers/discount/discount.dto';

export class UpdateDiscountUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: DiscountRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateDiscountDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateDiscountDto, DiscountM);
    await this.repo.update(id, item);
    this.logger.log('UpdateDiscountUseCases execute', `Discount ${id} updated`);
  }
}
