import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';
import { UpdateProductVariantDto } from '@/infrastructure/controllers/product-variant/product-variant.dto';
import { ProductVariantM } from '@/domain/model/product-variant';

export class UpdateProductVariantUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductVariantRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateProductVariantDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateProductVariantDto, ProductVariantM);
    this.repo.update(id, item);
    this.logger.log(
      'UpdateProductVariantUseCases execute',
      `Product Variant ${id} have been updated`,
    );
  }
}
