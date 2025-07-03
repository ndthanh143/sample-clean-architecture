import { ILogger } from '@/domain/logger/logger.interface';
import { ProductDetailM } from '@/domain/model/product-detail';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { AddProductDetailDto } from '@/infrastructure/controllers/product-detail/product-detail.dto';
import { Mapper } from '@automapper/core';

export class AddProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductDetailRepository,
    private readonly productRepo: ProductRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddProductDetailDto): Promise<ProductDetailM> {
    const item = this.mapper.map(payload, AddProductDetailDto, ProductDetailM);

    if (payload.productId) {
      const product = await this.productRepo.findById(payload.productId);
      if (!product) {
        throw new Error(`Product with ID ${payload.productId} not found`);
      }

      item.product = product;
    }

    const result = await this.repo.insert(item);
    this.logger.log('AddProductDetailUseCases execute', 'New item have been inserted');
    return result;
  }
}
