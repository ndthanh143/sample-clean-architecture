import { AutoMap } from '@automapper/classes';
import { ProductM } from './product';

export class DiscountM {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  percent: number;

  @AutoMap()
  startDate: Date;

  @AutoMap()
  endDate: Date;

  @AutoMap()
  products: ProductM[];

  @AutoMap()
  createdDate: Date;

  @AutoMap()
  updatedDate: Date;
}
