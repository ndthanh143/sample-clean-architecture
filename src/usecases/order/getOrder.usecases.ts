import { ILogger } from '@/domain/logger/logger.interface';
import { OrderM } from '@/domain/model/order';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { Mapper } from '@automapper/core';

export class GetOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(id: number): Promise<OrderM> {
    this.logger.log('GetOrderUseCases execute', 'Geting order by ID');
    return this.orderRepo.findById(id);
  }
}
