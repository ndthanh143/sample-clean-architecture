import { AutoMap } from '@automapper/classes';

export class FileM {
  @AutoMap()
  id: number;
  @AutoMap()
  url: string;
  @AutoMap()
  publicId: string;
  @AutoMap()
  originalName: string;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
