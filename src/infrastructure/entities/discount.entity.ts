import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { Product } from './product.entity';

@Entity('discount')
export class Discount extends Base {
  @AutoMap()
  @Column('varchar', { name: 'name', length: 50, nullable: false })
  name: string;

  @AutoMap()
  @Column('int', {
    name: 'percent',
    nullable: false,
  })
  percent: number;

  @AutoMap()
  @Column({
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @AutoMap()
  @Column({
    name: 'end_date',
    nullable: false,
  })
  endDate: Date;

  @AutoMap()
  @ManyToMany(() => Product, (product) => product.discounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  products: Product[];
}
