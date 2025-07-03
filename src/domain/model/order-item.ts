import { AutoMap } from '@automapper/classes';
import { OrderM } from './order';
import { ProductM } from './product';
import { ProductVariantM } from './product-variant';

export class OrderItemM {
  @AutoMap()
  id: number;
  @AutoMap()
  product: ProductM;
  @AutoMap()
  quantity: number;
  @AutoMap()
  priceAtPurchase: number;
  @AutoMap()
  productVariant: string;
  @AutoMap()
  durationMonths: number;
  @AutoMap()
  order: OrderM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
