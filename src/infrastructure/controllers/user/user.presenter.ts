import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;

  constructor(user: UserM) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.createdDate = user.createdDate;
    this.updatedDate = user.updatedDate;
  }
}
