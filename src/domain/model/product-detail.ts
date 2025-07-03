import { AutoMap } from '@automapper/classes';
import { ProductM } from './product';
import { UserProductDetailM } from './user-product-detail';

export class ProductDetailM {
  @AutoMap()
  id: number;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
  @AutoMap()
  product: ProductM;
  @AutoMap()
  userProductDetails: UserProductDetailM[];
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;

  // Additional properties can be added here as needed
  @AutoMap()
  sharingUserCount?: number; // This property is not in the database but is used in the application logic
}
