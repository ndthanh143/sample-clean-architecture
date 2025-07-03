import { AutoMap } from '@automapper/classes';

export class BlogCategoryM {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  slug: string;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
