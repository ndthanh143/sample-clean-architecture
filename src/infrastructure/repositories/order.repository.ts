import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { EntityManager, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { Order } from '../entities/order.entity';
import { OrderM } from '@/domain/model/order';
import { OrderItemM } from '@/domain/model/order-item';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '@/utils';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  withTransaction(manager: EntityManager): OrderRepository {
    return new DatabaseOrderRepository(
      manager,
      manager.getRepository(Order),
      manager.getRepository(OrderItem),
      this.mapper,
    );
  }
  async insert(order: OrderM): Promise<OrderM> {
    const entity = this.mapper.map(order, OrderM, Order);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, Order, OrderM);
  }

  async findAll(
    page: number,
    limit: number,
    userId?: number,
    status?: OrderStatus,
    q?: string,
    paymentCode?: string,
  ): Promise<[OrderM[], number]> {
    const qb = this.repository.createQueryBuilder('order');

    if (userId) {
      qb.andWhere('order.user_id = :userId', { userId });
    }

    if (status) {
      qb.andWhere('order.status = :status', { status });
    }

    qb.leftJoinAndSelect('order.user', 'user');
    qb.leftJoinAndSelect('order.items', 'items');
    qb.leftJoinAndSelect('items.product', 'product');
    qb.leftJoinAndSelect('order.userProductDetails', 'userProductDetails');
    qb.leftJoinAndSelect('userProductDetails.productDetail', 'productDetail');
    qb.leftJoinAndSelect('order.payment', 'payment');

    if (paymentCode) {
      qb.andWhere('payment.payment_code ILIKE :paymentCode', { paymentCode: `%${paymentCode}%` });
    }

    if (q?.trim()) {
      const trimmedQuery = q.trim();

      qb.andWhere(
        `(CAST(order.id AS TEXT) ILIKE :query OR unaccent(product.name) ILIKE unaccent(:query))`,
        {
          query: `%${trimmedQuery}%`,
        },
      );
    }

    qb.addOrderBy('order.createdDate', 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Order, OrderM);

    mapped.map((item) => ({
      ...item,
      productCount: item.items.reduce((acc, cur) => acc + cur.quantity, 0),
    }));

    return [mapped, total];
  }

  async findAllRecentPurchase(): Promise<[OrderM[], number]> {
    const qb = this.repository.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.user', 'user');
    qb.leftJoinAndSelect('order.items', 'items');
    qb.leftJoinAndSelect('items.product', 'product');
    qb.addOrderBy('order.createdDate', 'DESC');
    qb.take(20);
    qb.skip(0);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Order, OrderM);

    return [mapped, total];
  }

  async findByIds(ids: number[]): Promise<OrderM[]> {
    const qb = this.repository.createQueryBuilder('order');
    qb.where('order.id IN (:...ids)', { ids });
    qb.leftJoinAndSelect('order.items', 'items');
    qb.leftJoinAndSelect('items.product', 'product');
    qb.leftJoinAndSelect('order.user', 'user');

    const entities = await qb.getMany();
    return this.mapper.mapArray(entities, Order, OrderM);
  }

  async findById(id: number): Promise<OrderM> {
    const qb = this.repository.createQueryBuilder('order');
    qb.where('order.id = :id', { id });
    qb.leftJoinAndSelect('order.items', 'items');
    qb.leftJoinAndSelect('items.product', 'product');
    qb.leftJoinAndSelect('order.user', 'user');
    qb.leftJoinAndSelect('order.userProductDetails', 'userProductDetails');
    qb.leftJoinAndSelect('userProductDetails.productDetail', 'productDetail');
    qb.leftJoinAndSelect('productDetail.product', 'productDetail_product');
    qb.leftJoinAndSelect('order.payment', 'payment');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const mapped = await this.mapper.mapAsync(entity, Order, OrderM);
    mapped.items = await this.mapper.mapArrayAsync(entity.items, OrderItem, OrderItemM);

    return mapped;
  }

  // async findById(id: number): Promise<OrderM> {
  //   const qb = this.repository.createQueryBuilder('order');
  //   qb.where('order.id = :id', { id });
  //   qb.leftJoinAndSelect('order.items', 'items');
  //   qb.leftJoinAndSelect('items.product', 'product');
  //   qb.leftJoinAndSelect('order.user', 'user');
  //   qb.leftJoinAndSelect('order.userProductDetails', 'userProductDetails');
  //   qb.leftJoinAndSelect('userProductDetails.productDetail', 'productDetail');
  //   qb.leftJoinAndSelect('productDetail.product', 'productDetail_product');
  //   qb.leftJoinAndSelect('order.payment', 'payment');

  //   const entity = await qb.getOne();
  //   if (!entity) {
  //     throw new NotFoundException(`Order with ID ${id} not found`);
  //   }

  //   const mapped = await this.mapper.mapAsync(entity, Order, OrderM);
  //   mapped.items = await this.mapper.mapArrayAsync(entity.items, OrderItem, OrderItemM);

  //   return mapped;
  // }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, order: OrderM): Promise<void> {
    const entity = this.mapper.map(order, OrderM, Order);
    await this.repository.update({ id }, entity);
  }

  async insertOrderItem(data: OrderItemM): Promise<OrderItemM> {
    const entity = this.mapper.map(data, OrderItemM, OrderItem);
    entity.order = this.mapper.map(data.order, OrderM, Order);

    const result = await this.itemRepo.save(entity);
    return this.mapper.map(result, OrderItem, OrderItemM);
  }

  async findOrderItems(orderId: number): Promise<OrderItemM[]> {
    const items = await this.itemRepo.find({ where: { order: { id: orderId } } });
    return this.mapper.mapArray(items, OrderItem, OrderItemM);
  }

  deleteOrderItem(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
