import { OrderConfirmationEvent } from '@/domain/events/order-confirmation.event';
import { ILogger } from '@/domain/logger/logger.interface';
import { OrderM } from '@/domain/model/order';
import { OrderItemM } from '@/domain/model/order-item';
import { PaymentM } from '@/domain/model/payment';
import { UserM } from '@/domain/model/user';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { PaymentRepository } from '@/domain/repositories/paymentRepository.interface';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { AddOrderDto } from '@/infrastructure/controllers/order/order.dto';
import { OrderStatus } from '@/utils';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class AddOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly mapper: Mapper,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: number, dto: AddOrderDto): Promise<OrderM> {
    const order = new OrderM();
    order.user = { id: userId } as UserM;
    order.status = OrderStatus.PENDING;

    const items: OrderItemM[] = [];

    let total = 0;
    for (const item of dto.items) {
      const product = await this.productRepo.findById(item.productId);

      const variant = product.productVariants.find(
        (variant) => variant.id === item.productVariantId,
      );
      const plan = variant.productPlans.find((plan) => plan.id === item.productPlanId);

      const orderItem = new OrderItemM();
      orderItem.product = product;
      orderItem.quantity = item.quantity;
      orderItem.priceAtPurchase = plan.price;
      orderItem.productVariant = variant.name;
      orderItem.durationMonths = plan.durationMonths;
      orderItem.createdDate = new Date();
      orderItem.updatedDate = new Date();

      total += plan.price * item.quantity;
      items.push(orderItem);
    }

    order.totalPrice = total;
    order.items = items;
    const insertedOrder = await this.orderRepo.insert(order);

    const payment = new PaymentM();
    payment.method = dto.payment.method;
    payment.amount = total;
    payment.order = insertedOrder;
    await this.paymentRepo.insert(payment);

    await this.eventBus.publish(new OrderConfirmationEvent(insertedOrder.id));

    this.logger.log('AddOrderUseCases execute', 'New item have been inserted');

    return insertedOrder;
  }
}
