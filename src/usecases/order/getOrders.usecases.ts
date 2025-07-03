import { ILogger } from '@/domain/logger/logger.interface';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { createPaginationMeta, OrderStatus } from '@/utils';
import { Mapper } from '@automapper/core';

export class GetOrdersUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepo: OrderRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute({
    page,
    limit,
    userId,
    status,
    q,
    paymentCode,
  }: {
    page: number;
    limit: number;
    userId: number;
    status?: OrderStatus;
    q?: string;
    paymentCode?: string;
  }) {
    this.logger.log('GetOrdersUseCases execute', 'Geting orders');
    const [data, total] = await this.orderRepo.findAll(page, limit, userId, status, q, paymentCode);

    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }

  async executeGetOrderRecentPurchase() {
    this.logger.log('GetOrdersUseCases execute', 'Geting orders');
    const [data, total] = await this.orderRepo.findAllRecentPurchase();

    return {
      data,
      meta: createPaginationMeta(total, 1, 10),
    };
  }
}
