import { AutoMap } from '@automapper/classes';
import { ProductM } from './product';
import { ProductPlanM } from './product-plan';

export class ProductVariantM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  maximumShare;

  @AutoMap()
  stock: number;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  product: ProductM;

  @AutoMap()
  productPlans: ProductPlanM[];

  @AutoMap()
  createdDate: Date;

  @AutoMap()
  updatedDate: Date;
}
