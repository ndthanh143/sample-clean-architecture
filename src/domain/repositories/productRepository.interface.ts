import { ProductM } from '@/domain/model/product';

export interface ProductRepository {
  insert(data: ProductM): Promise<ProductM>;
  findAll(page: number, limit: number, categoryId: number): Promise<ProductM[]>;
  findById(id: number): Promise<ProductM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: ProductM): Promise<void>;
}
