import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from '@/domain/model/product';
import { CategoryM } from '@/domain/model/category';
import { ProductVariantM } from '@/domain/model/product-variant';
import { ReviewM } from '@/domain/model/review';

export class ProductPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  minPrice: number;
  @ApiProperty()
  maxPrice: number;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  productVariants: ProductVariantM[];
  @ApiProperty()
  reviews: ReviewM[];
  @ApiProperty()
  category?: CategoryM;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: ProductM) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.content = data.content;
    this.imageUrl = data.imageUrl;
    this.minPrice = data.minPrice;
    this.maxPrice = data.maxPrice;
    this.slug = data.slug;
    this.isPublished = data.isPublished;
    this.reviews = data.reviews;
    this.productVariants = data.productVariants;
    this.category = data.category;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
