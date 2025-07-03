import { AutoMap } from '@automapper/classes';
import { ProductM } from './product';
import { UserM } from './user';

export class ReviewM {
  @AutoMap()
  id: number;
  @AutoMap()
  image: string;
  @AutoMap()
  rating: number;
  @AutoMap()
  comment: string;
  @AutoMap()
  user: UserM;
  @AutoMap()
  product: ProductM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
