import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { ProductDetail } from './product-detail.entity';

@Entity()
export class Product extends Base {
  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @Column('varchar', { name: 'description', length: 255, nullable: false })
  description: string;

  @Column('decimal', { name: 'price', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('int', { name: 'stock', nullable: false })
  stock: number;

  @OneToOne(() => ProductDetail, (productDetail) => productDetail.productId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productDetail: ProductDetail;
}
