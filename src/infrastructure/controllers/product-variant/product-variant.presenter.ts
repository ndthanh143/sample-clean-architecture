import { ProductM } from '@/domain/model/product';
import { ProductPlanM } from '@/domain/model/product-plan';
import { ProductVariantM } from '@/domain/model/product-variant';
import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  maximumShare: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  product: ProductM;

  @ApiProperty()
  productPlans: ProductPlanM[];

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  constructor(data: ProductVariantM) {
    this.id = data.id;
    this.description = data.description;
    this.stock = data.stock;
    this.maximumShare = data.maximumShare;
    this.name = data.name;
    this.isActive = data.isActive;
    this.product = data.product;
    this.productPlans = data.productPlans;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
