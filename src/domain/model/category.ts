import { AutoMap } from '@automapper/classes';
import { ProductM } from './product';

export class CategoryM {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  imageUrl: string | null;
  @AutoMap()
  slug: string;
  // @AutoMap()
  // products: ProductM[];
  @AutoMap()
  productCount: number;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;

  generateSlug: () => void;
  slugify: (text: string) => string;
}
