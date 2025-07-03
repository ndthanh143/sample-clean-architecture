import { ProductVariantM } from '../model/product-variant';

export interface ProductVariantRepository {
  findById(id: number): Promise<ProductVariantM | null>;
  findAll(page: number, limit: number): Promise<[ProductVariantM[], number]>;
  insert(data: ProductVariantM): Promise<ProductVariantM>;
  update(id: number, data: Partial<ProductVariantM>): Promise<ProductVariantM>;
  delete(id: number): Promise<void>;
}
