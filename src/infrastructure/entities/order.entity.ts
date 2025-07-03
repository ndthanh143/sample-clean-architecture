import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '@/utils';
import { User } from './user.entity';
import { Payment } from './payment.entity';
import { UserProductDetail } from './user-product-detail.entity';

@Entity()
export class Order extends Base {
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
  totalPrice: number;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    nullable: false,
  })
  status: OrderStatus;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.orders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @AutoMap()
  @Column({ name: 'note', type: 'text', nullable: true })
  note: string;

  @AutoMap()
  @OneToOne(() => Payment, (payment) => payment.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payment: Payment;

  @AutoMap(() => [OrderItem])
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @AutoMap(() => [UserProductDetail])
  @OneToMany(() => UserProductDetail, (userProductDetail) => userProductDetail.order, {
    cascade: true,
  })
  userProductDetails: UserProductDetail[];
}
