import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Order } from './order.entity';
import { Role } from '@/utils';
import { UserProductDetail } from './user-product-detail.entity';

@Entity()
export class User extends Base {
  @AutoMap()
  @Column('varchar', { name: 'first_name', length: 255, nullable: false })
  firstName: string;

  @AutoMap()
  @Column('varchar', { name: 'last_name', length: 255, nullable: false })
  lastName: string;

  @AutoMap()
  @Index({ unique: true })
  @Column('varchar', { name: 'email', length: 255, nullable: false })
  email: string;

  @AutoMap()
  @Column('varchar', {
    name: 'password',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @AutoMap()
  @Column('varchar', { name: 'avatar_url', length: 255, nullable: true })
  avatarUrl: string | null;

  @AutoMap()
  @Column('varchar', { name: 'birthday', length: 255, nullable: true })
  birthday: string | null;

  @AutoMap()
  @Column('varchar', { name: 'phone', length: 11, nullable: true })
  phone: string | null;

  @AutoMap()
  @Column({ name: 'last_login', nullable: true })
  lastLogin?: Date;

  @AutoMap()
  @Column('varchar', { name: 'hach_refresh_token', nullable: true })
  hachRefreshToken: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  roles: Role;

  @AutoMap()
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @AutoMap()
  @OneToMany(() => UserProductDetail, (userProductDetail) => userProductDetail.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userProductDetails: UserProductDetail[];
}
