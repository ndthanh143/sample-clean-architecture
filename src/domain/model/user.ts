export class UserWithoutPassword {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  birthday: string | null;
  lastLogin: Date;
  hashRefreshToken: string;
  createdDate: Date;
  updatedDate: Date;
}

export class UserM extends UserWithoutPassword {
  password: string;
}

export class UserUpdateProfilePayload {
  firstName: string;
  lastName: string;
  phone?: string;
  birthday?: string;
  avatarUrl?: string;
}
