import {
  Column,
  Entity,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { name: 'first_name', length: 255, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255, nullable: false })
  lastName: string;

  @Column('varchar', { name: 'email', length: 255, nullable: false })
  email: string;

  @Column('varchar', { name: 'password', length: 50, nullable: false })
  password: string;
}
