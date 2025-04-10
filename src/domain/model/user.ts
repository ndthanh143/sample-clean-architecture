export class UserWithoutPassword {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: Date;
  hashRefreshToken: string;
  createdDate: Date;
  updatedDate: Date;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
