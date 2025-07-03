import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { OrderConfirmationEvent } from '@/domain/events/order-Confirmation.event';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { MailerService } from '../../services/mailer/mailer.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { formatDate } from '@/utils';
import { DatabaseOrderRepository } from '@/infrastructure/repositories/order.repository';

@EventsHandler(OrderConfirmationEvent)
export class OrderConfirmationHandler implements IEventHandler<OrderConfirmationEvent> {
  constructor(
    @Inject(DatabaseOrderRepository)
    private readonly orderRepo: OrderRepository,
    @Inject(MailerService)
    private readonly mailerService: MailerService,
  ) {}

  async handle(event: OrderConfirmationEvent): Promise<void> {
    const order = await this.orderRepo.findById(event.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const userName = order.user.lastName;
    const email = order.user.email;
    const orderCode = order.id;
    const orderDate = formatDate(order.createdDate, 'datetime');
    const orderItems = order.items;
    const totalAmount = order.totalPrice;
    const paymentMethod = order.payment?.method || 'MOMO';
    const trackingLink = `https://localhost:3000/my-orders/${order.id}`;
    await this.mailerService.sendOrderConfirmation(
      userName,
      email,
      orderCode,
      orderDate,
      orderItems,
      totalAmount,
      paymentMethod,
      trackingLink,
    );
  }
}
