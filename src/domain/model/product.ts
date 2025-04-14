import { AutoMap } from '@automapper/classes';
import { CategoryM } from './category';

export class ProductM {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  price: number;
  @AutoMap()
  stock: number;
  @AutoMap()
  category: CategoryM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
