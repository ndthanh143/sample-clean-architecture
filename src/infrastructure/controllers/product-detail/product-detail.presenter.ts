import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from '@/domain/model/product';
import { ProductDetailM } from '@/domain/model/product-detail';
import { UserProductDetailM } from '@/domain/model/user-product-detail';

export class ProductDetailPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  product?: ProductM;
  @ApiProperty()
  userProductDetails?: UserProductDetailM[];
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  // Additional properties can be added here as needed
  @ApiProperty()
  sharingUserCount?: number; // This property is not in the database but is used in the application logic

  constructor(data: ProductDetailM) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.product = data.product;
    this.userProductDetails = data.userProductDetails;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;

    this.sharingUserCount = data.sharingUserCount;
  }
}
