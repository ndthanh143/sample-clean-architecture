import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem extends Base {
  @AutoMap()
  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @AutoMap()
  @Column('decimal', {
    name: 'price_at_purchase',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  priceAtPurchase: number;

  @AutoMap(() => Order)
  @ManyToOne(() => Order, (order) => order.items, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @AutoMap(() => Product)
  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @AutoMap()
  @Column({ name: 'product_variant', type: 'varchar', nullable: true })
  productVariant: string;

  @AutoMap()
  @Column('int', { name: 'duration_months', nullable: false })
  durationMonths: number;
}
