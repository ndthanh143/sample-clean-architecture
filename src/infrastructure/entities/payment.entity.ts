import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Order } from './order.entity';
import { PaymentMethod, PaymentStatus } from '@/utils';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Payment extends Base {
  @AutoMap()
  @Column()
  amount: number;

  @AutoMap()
  @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
  method: PaymentMethod;

  @AutoMap()
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING, nullable: false })
  status: PaymentStatus;

  @AutoMap()
  @Index('payment_code_index', { unique: true })
  @Column({ name: 'payment_code', type: 'varchar', length: 20, nullable: false })
  paymentCode: string;

  @AutoMap()
  @OneToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
