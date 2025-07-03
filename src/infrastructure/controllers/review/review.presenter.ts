import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from '@/domain/model/product';
import { ReviewM } from '@/domain/model/review';
import { UserM } from '@/domain/model/user';

export class ReviewPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  image: string;
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  product: ProductM;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: ReviewM) {
    this.id = data.id;
    this.comment = data.comment;
    this.rating = data.rating;
    this.image = data.image;
    this.user = data.user;
    this.product = data.product;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
