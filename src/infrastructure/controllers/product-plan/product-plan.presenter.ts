import { ProductPlanM } from '@/domain/model/product-plan';
import { ProductVariantM } from '@/domain/model/product-variant';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPlanPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  durationMonths: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  productVariant: ProductVariantM | null;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  constructor(data: ProductPlanM) {
    this.id = data.id;
    this.description = data.description;
    this.price = data.price;
    this.durationMonths = data.durationMonths;
    this.isActive = data.isActive;
    this.productVariant = data.productVariant;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
