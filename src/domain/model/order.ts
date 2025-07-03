import { OrderStatus } from '@/utils';
import { UserM } from './user';
import { AutoMap } from '@automapper/classes';
import { OrderItemM } from './order-item';
import { PaymentM } from './payment';
import { UserProductDetailM } from './user-product-detail';

export class OrderM {
  @AutoMap()
  id: number;
  @AutoMap()
  user: UserM;
  @AutoMap()
  totalPrice: number;
  @AutoMap()
  note: string;
  @AutoMap()
  status: OrderStatus;
  @AutoMap()
  items: OrderItemM[];
  @AutoMap()
  userProductDetails: UserProductDetailM[];
  @AutoMap()
  payment: PaymentM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
