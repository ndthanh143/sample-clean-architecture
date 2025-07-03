import { ProductDetailM } from '../model/product-detail';

export interface ProductDetailRepository {
  insert(data: ProductDetailM): Promise<ProductDetailM>;
  findAll(
    page: number,
    limit: number,
    productId?: number,
    q?: string,
  ): Promise<[ProductDetailM[], number]>;
  findAllForGranting(
    page: number,
    limit: number,
    productId?: number,
    variantId?: number,
    q?: string,
    grantingUserId?: number,
  ): Promise<[ProductDetailM[], number]>;
  findById(id: number): Promise<ProductDetailM>;
  findByIdToSendEmail(id: number): Promise<ProductDetailM>;
  findByIds(ids: number[]): Promise<ProductDetailM[]>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: ProductDetailM): Promise<void>;
}
