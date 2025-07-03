import { AutoMap } from '@automapper/classes';
import { ProductVariantM } from './product-variant';

export class ProductPlanM {
  @AutoMap()
  id: number;

  @AutoMap()
  durationMonths: number;

  @AutoMap()
  price: number;

  @AutoMap()
  description: string;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  productVariant: ProductVariantM;

  @AutoMap()
  createdDate: Date;

  @AutoMap()
  updatedDate: Date;
}
