import { BlogM } from '@/domain/model/blog';
import { BlogCategoryM } from '@/domain/model/blog-category';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  thumbnail: string | null = null;
  @ApiProperty()
  category: BlogCategoryM;
  @ApiProperty()
  readTime: number;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(blog: BlogM) {
    this.id = blog.id;
    this.title = blog.title;
    this.description = blog.description;
    this.content = blog.content;
    this.thumbnail = blog.thumbnail;
    this.category = blog.category;
    this.readTime = blog.readTime;
    this.slug = blog.slug;
    this.createdDate = blog.createdDate;
    this.updatedDate = blog.updatedDate;
  }
}
