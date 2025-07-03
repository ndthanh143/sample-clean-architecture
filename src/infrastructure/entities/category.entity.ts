import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
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
  @Column('varchar', { name: 'slug', length: 255, nullable: false })
  slug: string;

  @AutoMap()
  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];

  @AutoMap()
  productCount: number; // column to map the product count

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = this.slugify(this.name);
    }
  }

  slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
