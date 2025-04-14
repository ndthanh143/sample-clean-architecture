import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Product } from './product.entity';

@Entity()
export class Category extends Base {
  @AutoMap()
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column('text', { name: 'description', nullable: true })
  description: string;

  @AutoMap()
  @Column('varchar', { name: 'image_url', length: 255, nullable: true })
  imageUrl: string | null;

  @AutoMap()
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
