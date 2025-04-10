import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductDetail extends Base {
  @Column('varchar', { name: 'color', length: 50, nullable: false })
  email: string;

  @Column('varchar', { name: 'size', length: 50, nullable: false })
  password: string;

  @OneToOne(() => Product, (product) => product.productDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  productId: number;
}
