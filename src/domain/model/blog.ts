import { AutoMap } from '@automapper/classes';
import { BlogCategoryM } from './blog-category';

export class BlogM {
  @AutoMap()
  id: number;
  @AutoMap()
  title: string;
  @AutoMap()
  description: string;
  @AutoMap()
  slug: string;
  @AutoMap()
  content: string;
  @AutoMap()
  thumbnail: string | null;
  @AutoMap()
  isActive: boolean;
  @AutoMap()
  readTime: number;
  @AutoMap()
  category: BlogCategoryM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
