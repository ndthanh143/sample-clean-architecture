import { ILogger } from '@/domain/logger/logger.interface';
import { OrderM } from '@/domain/model/order';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { UpdateOrderDto } from '@/infrastructure/controllers/order/order.dto';
import { createPaginationMeta, OrderStatus } from '@/utils';
import { Mapper } from '@automapper/core';

export class UpdateOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepo: OrderRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateOrderDto) {
    const item = this.mapper.map(payload, UpdateOrderDto, OrderM);
    this.logger.log('UpdateOrderUseCases execute', 'Updating order');

    return this.orderRepo.updateById(id, item);
  }

  async executeCompletedStatus(id: number) {
    this.logger.log('UpdateOrderUseCases executeCompleteStatus', 'Updating order status to paid');

    const item = { status: OrderStatus.COMPLETED };
    return this.orderRepo.updateById(id, item as OrderM);
  }

  async executeCancelStatus(id: number) {
    this.logger.log('UpdateOrderUseCases executeCancelStatus', 'Updating order status to canceled');

    const item = { status: OrderStatus.CANCELLED };
    return this.orderRepo.updateById(id, item as OrderM);
  }

  executePendingStatus(id: number) {
    this.logger.log('UpdateOrderUseCases executePendingStatus', 'Updating order status to pending');

    const item = { status: OrderStatus.PENDING };
    return this.orderRepo.updateById(id, item as OrderM);
  }
}
