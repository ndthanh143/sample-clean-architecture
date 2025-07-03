import { AutoMap } from '@automapper/classes';
import { ProductDetailM } from './product-detail';
import { UserM } from './user';
import { OrderM } from './order';

export class UserProductDetailM {
  @AutoMap()
  id: number;
  @AutoMap()
  startDate: Date;
  @AutoMap()
  expiredDate: Date;
  @AutoMap()
  productDetail: ProductDetailM;
  @AutoMap()
  isExpired?: boolean;
  @AutoMap()
  user: UserM;
  @AutoMap()
  order: OrderM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
