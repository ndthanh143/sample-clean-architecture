import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { name: 'first_name', length: 255, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255, nullable: false })
  lastName: string;

  @Column('varchar', { name: 'email', length: 255, nullable: false })
  email: string;

  @Column('varchar', { name: 'password', length: 255, nullable: false })
  password: string;

  @Column('varchar', { name: 'avatar_url', length: 255, nullable: true })
  avatarUrl: string | null;

  @Column({ name: 'last_login', nullable: true })
  lastLogin?: Date;

  @Column('varchar', { name: 'hach_refresh_token', nullable: true })
  hachRefreshToken: string;
}
