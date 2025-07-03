import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { UpdateProductDetailDto } from '@/infrastructure/controllers/product-detail/product-detail.dto';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { ProductDetailM } from '@/domain/model/product-detail';
import { CommandBus } from '@nestjs/cqrs';
import { AccountPasswordUpdatedCommand } from '@/domain/events/account-password-updated.command';

export class UpdateProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductDetailRepository,
    private readonly productRepo: ProductRepository,
    private readonly mapper: Mapper,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(id: number, payload: UpdateProductDetailDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateProductDetailDto, ProductDetailM);
    if (payload.productId) {
      const product = await this.productRepo.findById(payload.productId);
      if (!product) {
        throw new Error(`Product with ID ${payload.productId} not found`);
      }

      item.product = product;
    }
    this.repo.updateById(id, item);
    this.logger.log('UpdateProductDetailUseCases execute', `Product ${id} have been updated`);

    try {
      await this.commandBus.execute(new AccountPasswordUpdatedCommand(id));
    } catch (error) {
      this.logger.error(
        'UpdateProductDetailUseCases execute',
        `Error when sending email: ${error.message}`,
      );
    }
  }
}
