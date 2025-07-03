import { ApiProperty } from '@nestjs/swagger';
import { DiscountM } from '@/domain/model/discount';
import { ProductM } from '@/domain/model/product';

export class DiscountPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  percent: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  products: ProductM[];

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  constructor(data: DiscountM) {
    this.id = data.id;
    this.name = data.name;
    this.percent = data.percent;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.products = data.products;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
