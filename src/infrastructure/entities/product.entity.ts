import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { ProductDetail } from './product-detail.entity';
import { AutoMap } from '@automapper/classes';
import { Category } from './category.entity';

@Entity()
export class Product extends Base {
  @AutoMap()
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column('varchar', { name: 'description', length: 255, nullable: false })
  description: string;

  @AutoMap()
  @Column('decimal', {
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @AutoMap()
  @Column('int', { name: 'stock', nullable: false })
  stock: number;

  @AutoMap()
  @OneToOne(() => ProductDetail, (productDetail) => productDetail.productId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  productDetail: ProductDetail;

  @AutoMap()
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;
}
