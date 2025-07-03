import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  Index,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Category } from './category.entity';
import { ProductVariant } from './product-variant.entity';
import { Discount } from './discount.entity';
import { Review } from './review.entity';

@Entity()
export class Product extends Base {
  @AutoMap()
  @Index({ unique: true, fulltext: true })
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column('text', { name: 'description', nullable: true })
  description: string;

  @AutoMap()
  @Column('text', { name: 'content', nullable: true })
  content: string;

  @AutoMap()
  @Column('varchar', { name: 'image_url', length: 255, nullable: true })
  imageUrl: string;

  @AutoMap()
  @Column('decimal', {
    name: 'min_price',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  minPrice: number;

  @AutoMap()
  @Column('decimal', {
    name: 'max_price',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  maxPrice: number;

  @AutoMap()
  @Index({ unique: true })
  @Column('varchar', { name: 'slug', length: 255, nullable: false })
  slug: string;

  @AutoMap()
  @Column('boolean', { name: 'is_published', nullable: true, default: false })
  isPublished: boolean;

  @AutoMap(() => Review)
  @OneToMany(() => Review, (review) => review.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  reviews: Review[];

  @AutoMap()
  @ManyToOne(() => Category, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;

  @AutoMap()
  @OneToMany(() => ProductVariant, (product) => product.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    cascade: true,
    eager: true,
  })
  productVariants: ProductVariant[];

  @AutoMap()
  @ManyToMany(() => Discount, (discount) => discount.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  discounts: Discount[];

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
      .normalize('NFD') // Chuyển ký tự thành dạng tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu (accent)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // thay khoảng trắng thành dấu -
      .replace(/[^\w\-]+/g, '') // xóa các ký tự đặc biệt
      .replace(/\-\-+/g, '-'); // thay nhiều dấu - liên tiếp thành 1 dấu -
  }
}
