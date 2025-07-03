import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  DataSource,
} from 'typeorm';
import { Product } from '../../entities/product.entity';
import { EventBus } from '@nestjs/cqrs';
import { ProductSavedEvent } from '../../../domain/events/product-saved.event';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  async afterInsert(event: InsertEvent<Product>): Promise<void> {
    this.eventBus.publish(new ProductSavedEvent(event.entity.id));
  }

  async afterUpdate(event: UpdateEvent<Product>): Promise<void> {
    if (event.entity) {
      this.eventBus.publish(new ProductSavedEvent(event.entity.id));
    }
  }
}
