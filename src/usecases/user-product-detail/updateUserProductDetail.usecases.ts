import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';
import { UpdateUserProductDetailDto } from '@/infrastructure/controllers/user-product-detail/user-product-detail.dto';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { UserRepository } from '@/domain/repositories/userRepository.interface';

export class UpdateUserProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: UserProductDetailRepository,
    private readonly productDetailRepo: ProductDetailRepository,
    private readonly userRepo: UserRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateUserProductDetailDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateUserProductDetailDto, UserProductDetailM);
    if (payload.productDetailId) {
      const product = await this.productDetailRepo.findById(payload.productDetailId);
      if (!product) {
        throw new Error(`Product with ID ${payload.productDetailId} not found`);
      }

      item.productDetail = product;
    }
    if (payload.userId) {
      const user = await this.userRepo.getUserById(payload.userId);
      if (!user) {
        throw new Error(`User with ID ${payload.userId} not found`);
      }

      item.user = user;
    }

    this.repo.updateById(id, item);
    this.logger.log('UpdateUserProductDetailUseCases execute', `Product ${id} have been updated`);
  }
}
