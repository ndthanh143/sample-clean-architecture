import { BlogCategoryM } from '@/domain/model/blog-category';
import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(blog: BlogCategoryM) {
    this.id = blog.id;
    this.name = blog.name;
    this.slug = blog.slug;
    this.createdDate = blog.createdDate;
    this.updatedDate = blog.updatedDate;
  }
}
