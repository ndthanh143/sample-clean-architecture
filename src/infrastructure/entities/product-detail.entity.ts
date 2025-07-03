import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';
import { AutoMap } from '@automapper/classes';
import { UserProductDetail } from './user-product-detail.entity';

@Entity('product_detail')
export class ProductDetail extends Base {
  @AutoMap()
  @Column('varchar', { name: 'color', length: 50, nullable: false })
  email: string;

  @AutoMap()
  @Column('varchar', { name: 'size', length: 50, nullable: false })
  password: string;

  @AutoMap()
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @AutoMap()
  @OneToMany(() => UserProductDetail, (userProductDetail) => userProductDetail.productDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userProductDetails: UserProductDetail[];
}
