import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Blog } from './blog.entity';

@Entity('blog_category')
export class BlogCategory extends Base {
  @AutoMap()
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column('varchar', { name: 'slug', length: 255, nullable: false })
  slug: string;

  @AutoMap()
  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = this.slugify(this.name);
    }
  }

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
}
