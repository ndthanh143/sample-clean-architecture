import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { ProductDetail } from './product-detail.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('user_product_detail')
export class UserProductDetail extends Base {
  @AutoMap()
  @Column('date', { name: 'start_date', nullable: false })
  startDate: Date;

  @AutoMap()
  @Column('date', { name: 'expired_date', nullable: false })
  expiredDate: Date;

  @AutoMap()
  @ManyToOne(() => ProductDetail, (productDetail) => productDetail.userProductDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;

  @AutoMap()
  @ManyToOne(() => User, (user) => user.userProductDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @AutoMap()
  @ManyToOne(() => Order, (order) => order.userProductDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
