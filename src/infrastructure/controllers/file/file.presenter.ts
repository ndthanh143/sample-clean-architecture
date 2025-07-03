import { FileM } from '@/domain/model/file';
import { ApiProperty } from '@nestjs/swagger';

export class FilePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  url: string;
  @ApiProperty()
  publicId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(data: FileM) {
    this.id = data.id;
    this.url = data.url;
    this.publicId = data.publicId;
    this.name = data.originalName;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
