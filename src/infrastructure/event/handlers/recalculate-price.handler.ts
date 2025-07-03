import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ProductSavedEvent } from '../../../domain/events/product-saved.event';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { Inject } from '@nestjs/common';
import { DatabaseProductRepository } from '../../repositories/product.repository';

@EventsHandler(ProductSavedEvent)
export class RecalculatePriceHandler implements IEventHandler<ProductSavedEvent> {
  constructor(
    @Inject(DatabaseProductRepository)
    private readonly productRepo: ProductRepository,
  ) {}

  async handle(event: ProductSavedEvent): Promise<void> {
    await this.productRepo.recalculatePriceRange(event.productId);
  }
}
