import { OrderStatus } from '@/utils';
import { OrderM } from '../model/order';
import { OrderItemM } from '../model/order-item';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

export interface OrderRepository {
  withTransaction(manager: EntityManager): OrderRepository;
  insert(data: OrderM): Promise<OrderM>;
  findAll(
    page: number,
    limit: number,
    userId: number,
    status?: OrderStatus,
    q?: string,
    paymentCode?: string,
  ): Promise<[OrderM[], number]>;
  findAllRecentPurchase(): Promise<[OrderM[], number]>;
  findByIds(ids: number[]): Promise<OrderM[]>;
  findById(id: number): Promise<OrderM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: OrderM): Promise<void>;
  findOrderItems(orderId: number): Promise<OrderItemM[]>;
  insertOrderItem(data: OrderItemM): Promise<OrderItemM>;
  deleteOrderItem(id: number): Promise<void>;
}
