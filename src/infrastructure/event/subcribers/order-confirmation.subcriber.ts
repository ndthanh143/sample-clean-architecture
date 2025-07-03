import { EntitySubscriberInterface, EventSubscriber, InsertEvent, DataSource } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { Order } from '../../entities/order.entity';
import { OrderConfirmationEvent } from '@/domain/events/order-Confirmation.event';

@EventSubscriber()
export class OrderConfirmationSubcriber implements EntitySubscriberInterface<Order> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Order;
  }

  async afterInsert(event: InsertEvent<Order>): Promise<void> {
    this.eventBus.publish(new OrderConfirmationEvent(event.entity.id));
  }
}
