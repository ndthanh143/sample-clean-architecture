import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';
import { AutoMap } from '@automapper/classes';
import { ProductPlan } from './product-plan.entity';

@Entity('product_variant')
export class ProductVariant extends Base {
  @AutoMap()
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @AutoMap()
  @Column('text', { name: 'description', nullable: true })
  description: string;

  @AutoMap()
  @Column('int', { name: 'stock', nullable: false, default: 0 })
  stock: number;

  @AutoMap()
  @Column('boolean', { name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @AutoMap()
  @Column('int', { name: 'maximum_share', nullable: true, default: 1 })
  maximumShare: number;

  @AutoMap()
  @ManyToOne(() => Product, (product) => product.productVariants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @AutoMap()
  @OneToMany(() => ProductPlan, (productPlan) => productPlan.productVariant, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    nullable: true,
  })
  productPlans: ProductPlan[];
}
