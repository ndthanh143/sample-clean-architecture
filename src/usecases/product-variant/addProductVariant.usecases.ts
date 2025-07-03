import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';
import { ProductVariantM } from '@/domain/model/product-variant';
import { AddProductVariantDto } from '@/infrastructure/controllers/product-variant/product-variant.dto';

export class AddProductVariantUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productVariantRepo: ProductVariantRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddProductVariantDto): Promise<ProductVariantM> {
    const item = this.mapper.map(payload, AddProductVariantDto, ProductVariantM);

    const result = await this.productVariantRepo.insert(item);
    this.logger.log('AddProductVariantUseCases execute', 'New Product Variant have been inserted');
    return result;
  }
}
