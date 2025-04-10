import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  getUserByEmail(email: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
