import { ILogger } from '@/domain/logger/logger.interface';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { OrderRepository } from '@/domain/repositories/orderRepository.interface';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';
import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { AddUserProductDetailDto } from '@/infrastructure/controllers/user-product-detail/user-product-detail.dto';
import { Mapper } from '@automapper/core';

export class AddUserProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: UserProductDetailRepository,
    private readonly productDetailRepo: ProductDetailRepository,
    private readonly userRepo: UserRepository,
    private readonly orderRepo: OrderRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddUserProductDetailDto): Promise<UserProductDetailM> {
    const item = this.mapper.map(payload, AddUserProductDetailDto, UserProductDetailM);

    if (payload.productDetailId) {
      const product = await this.productDetailRepo.findById(payload.productDetailId);
      if (!product) {
        throw new Error(`ProductDetail with ID ${payload.productDetailId} not found`);
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

    const result = await this.repo.insert(item);
    this.logger.log('AddUserProductDetailUseCases execute', 'New item have been inserted');
    return result;
  }

  async executeBulk(payload: AddUserProductDetailDto[]) {
    const productDetailIds = [...new Set(payload.map((p) => p.productDetailId).filter(Boolean))];
    const userIds = [...new Set(payload.map((p) => p.userId).filter(Boolean))];
    const orderIds = [...new Set(payload.map((p) => p.orderId).filter(Boolean))];

    const [products, users, orders] = await Promise.all([
      this.productDetailRepo.findByIds(productDetailIds),
      this.userRepo.getUsersByIds(userIds),
      this.orderRepo.findByIds(orderIds),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const userMap = new Map(users.map((u) => [u.id, u]));
    const orderMap = new Map(orders.map((o) => [o.id, o]));

    const items = payload.map((cur) => {
      const item = this.mapper.map(cur, AddUserProductDetailDto, UserProductDetailM);

      if (cur.productDetailId) {
        const product = productMap.get(cur.productDetailId);
        if (!product) {
          throw new Error(`ProductDetail with ID ${cur.productDetailId} not found`);
        }
        item.productDetail = product;
      }

      if (cur.userId) {
        const user = userMap.get(cur.userId);
        if (!user) {
          throw new Error(`User with ID ${cur.userId} not found`);
        }
        item.user = user;
      }

      if (cur.orderId) {
        const order = orderMap.get(cur.orderId);
        if (!order) {
          throw new Error(`Order with ID ${cur.orderId} not found`);
        }
        item.order = order;
      }

      return item;
    });

    const result = await this.repo.insertBulk(items);
    this.logger.log('AddUserProductDetailUseCases executeBulk', 'New items have been inserted');
    return result;
  }
}
