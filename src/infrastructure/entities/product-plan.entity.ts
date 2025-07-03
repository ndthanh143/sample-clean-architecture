import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { ProductVariant } from './product-variant.entity';
import { AutoMap } from '@automapper/classes';

@Entity('product_plan')
export class ProductPlan extends Base {
  @AutoMap()
  @Column('int', { name: 'duration_months', nullable: false })
  durationMonths: number;

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
  @Column('text', { name: 'description', nullable: true })
  description: string;

  @AutoMap()
  @Column('boolean', { name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @AutoMap()
  @ManyToOne(() => ProductVariant, (productVariant) => productVariant.productPlans, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: ProductVariant;
}
