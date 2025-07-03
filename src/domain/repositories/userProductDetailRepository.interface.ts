import { AccountSortBy } from '@/infrastructure/controllers/user-product-detail/user-product-detail.dto';
import { UserProductDetailM } from '../model/user-product-detail';

export interface UserProductDetailRepository {
  insert(data: UserProductDetailM): Promise<UserProductDetailM>;
  insertBulk(data: UserProductDetailM[]): Promise<UserProductDetailM[]>;
  findAll(
    page: number,
    limit: number,
    userId?: number,
    productDetailId?: number,
  ): Promise<[UserProductDetailM[], number]>;
  findAllAndHandleExipred(
    page: number,
    limit: number,
    userId?: number,
    productDetailId?: number,
    status?: 'expired' | 'active',
    q?: string,
    sortBy?: AccountSortBy,
  ): Promise<[UserProductDetailM[], number]>;
  findById(id: number): Promise<UserProductDetailM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: UserProductDetailM): Promise<void>;
}
