import { AutoMap } from '@automapper/classes';
import { CategoryM } from './category';
import { DiscountM } from './discount';
import { ProductVariantM } from './product-variant';
import { ReviewM } from './review';

export class ProductM {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  content: string;
  @AutoMap()
  minPrice: number;
  @AutoMap()
  maxPrice: number;
  @AutoMap()
  imageUrl: string;
  @AutoMap()
  slug: string;
  @AutoMap()
  isPublished: boolean;
  @AutoMap()
  category: CategoryM;
  @AutoMap()
  reviews: ReviewM[];
  @AutoMap()
  discounts: DiscountM[];
  @AutoMap()
  productVariants: ProductVariantM[];
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;

  generateSlug: () => void;
  slugify: (text: string) => string;
}
