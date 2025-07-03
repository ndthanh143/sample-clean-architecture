import { OrderM } from '@/domain/model/order';
import { OrderItemM } from '@/domain/model/order-item';
import { PaymentM } from '@/domain/model/payment';
import { UserM } from '@/domain/model/user';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { OrderStatus } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  status: OrderStatus;
  @ApiProperty()
  productCount: number;
  @ApiProperty()
  items: OrderItemM[];
  @ApiProperty()
  userProductDetails: UserProductDetailM[];
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  payment: PaymentM;
  @ApiProperty()
  note: string;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: OrderM) {
    this.id = data.id;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.productCount = data.items?.reduce((acc, cur) => acc + cur.quantity, 0);
    this.payment = data.payment;

    this.items = data.items;
    this.userProductDetails = data.userProductDetails;
    this.note = data.note;
    this.user = data.user;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
