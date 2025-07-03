import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('review')
export class Review extends Base {
  @AutoMap()
  @Column({ name: 'comment', type: 'text', nullable: true })
  comment: string;

  @AutoMap()
  @Column({ name: 'rating', type: 'int', nullable: false })
  rating: number;

  @AutoMap()
  @Column({ name: 'image', type: 'text', nullable: true })
  image: string;

  @AutoMap(() => User)
  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @AutoMap()
  @ManyToOne(() => Product, (product) => product.reviews, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
