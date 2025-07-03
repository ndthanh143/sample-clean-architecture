import { ILogger } from '@/domain/logger/logger.interface';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { createPaginationMeta } from '@/utils';
import { Mapper } from '@automapper/core';

export class GetUserOrdersUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepo: OrderRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(page: number, litmit: number, userId: number) {
    const [data, total] = await this.orderRepo.findAll(page, litmit, userId);
    this.logger.log('GetUserOrdersUseCases execute', 'Geting order by userId');

    return {
      data,
      meta: createPaginationMeta(total, page, litmit),
    };
  }
}
