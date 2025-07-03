import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { BlogCategory } from './blog-category.entity';

@Entity()
export class Blog extends Base {
  @AutoMap()
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @AutoMap()
  @Column({ name: 'description', type: 'text' })
  description: string;

  @AutoMap()
  @Column({ name: 'content', type: 'text' })
  content: string;

  @AutoMap()
  @Column({ name: 'thumbnail', type: 'varchar', length: 255 })
  thumbnail: string;

  @AutoMap()
  @Index({ unique: true })
  @Column({ name: 'slug', type: 'varchar', length: 255 })
  slug: string;

  @AutoMap()
  @Column('int', { name: 'read_time', nullable: true, default: 0 })
  readTime: number;

  @AutoMap()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => BlogCategory, (blogCategory) => blogCategory.blogs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @AutoMap()
  category: BlogCategory;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.title) {
      this.slug = this.slugify(this.title);
    }
  }

  private slugify(text: string): string {
    return text
      .toString()
      .normalize('NFD') // Chuyển ký tự thành dạng tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu (accent)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // thay khoảng trắng thành dấu -
      .replace(/[^\w\-]+/g, '') // xóa các ký tự đặc biệt
      .replace(/\-\-+/g, '-'); // thay nhiều dấu - liên tiếp thành 1 dấu -
  }
}
