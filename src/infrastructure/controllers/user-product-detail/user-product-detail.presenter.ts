import { ApiProperty } from '@nestjs/swagger';
import { ProductDetailM } from '@/domain/model/product-detail';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { UserM } from '@/domain/model/user';
import { OrderM } from '@/domain/model/order';

export class UserProductDetailPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  expiredDate: Date;
  @ApiProperty()
  isExpired: boolean;
  @ApiProperty()
  productDetail?: ProductDetailM;
  @ApiProperty()
  user?: UserM;
  @ApiProperty()
  order: OrderM;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: UserProductDetailM) {
    this.id = data.id;
    this.startDate = data.startDate;
    this.expiredDate = data.expiredDate;
    this.isExpired = data.isExpired;
    this.productDetail = data.productDetail;
    this.user = data.user;
    this.order = data.order;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
