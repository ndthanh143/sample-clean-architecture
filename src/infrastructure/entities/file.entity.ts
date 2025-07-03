import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('file')
export class File extends Base {
  @AutoMap()
  @Column('varchar', { name: 'public_id', length: 255, nullable: false })
  publicId: string;
  @AutoMap()
  @Column('varchar', { name: 'url', length: 255, nullable: false })
  url: string;
  @AutoMap()
  @Column('varchar', { name: 'original_name', length: 255, nullable: false })
  originalName: string;
}
