import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Base {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @AutoMap()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
