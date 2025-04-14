import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from '@/domain/model/product';

export class ProductPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: ProductM) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
