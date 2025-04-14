import { AutoMap } from '@automapper/classes';

export class CategoryM {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  imageUrl: string | null;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
