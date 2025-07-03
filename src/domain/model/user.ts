import { AutoMap } from '@automapper/classes';
import { OrderM } from './order';
import { Role } from '@/utils';
import { UserProductDetailM } from './user-product-detail';

export class UserWithoutPassword {
  @AutoMap()
  id: number;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  email: string;
  @AutoMap()
  phone: string | null;
  @AutoMap()
  avatarUrl: string | null;
  @AutoMap()
  birthday: string | null;
  @AutoMap()
  lastLogin?: Date;
  @AutoMap()
  hachRefreshToken: string;
  @AutoMap()
  roles: Role;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
  @AutoMap()
  orders: OrderM[];
  @AutoMap()
  userProductDetails: UserProductDetailM[];
}

export class UserM extends UserWithoutPassword {
  @AutoMap()
  password: string;
}

export class UserUpdateProfilePayload {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  phone?: string;
  @AutoMap()
  birthday?: string;
  @AutoMap()
  avatarUrl?: string;
}
