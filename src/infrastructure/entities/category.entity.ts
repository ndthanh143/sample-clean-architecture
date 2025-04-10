import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Category extends Base {
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('varchar', { name: 'description', length: 255, nullable: false })
  description: string;

  @Column('varchar', { name: 'image_url', length: 255, nullable: false })
  imageUrl: string | null;
}
