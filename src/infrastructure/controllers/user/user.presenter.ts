import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  lastLogin: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(user: UserWithoutPassword) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.birthday = user.birthday;
    this.avatarUrl = user.avatarUrl;
    this.lastLogin = user.lastLogin;
    this.createdDate = user.createdDate;
    this.updatedDate = user.updatedDate;
  }
}
