import { ApiProperty } from '@nestjs/swagger';
import { CategoryM } from '@/domain/model/category';

export class CategoryPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  imageUrl: string | null = null;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(category: CategoryM) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.imageUrl = category.imageUrl;
    this.createdDate = category.createdDate;
    this.updatedDate = category.updatedDate;
  }
}
