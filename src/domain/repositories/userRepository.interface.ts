import { UserM, UserUpdateProfilePayload } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  createGoogleUser(email: string, name: string, picture: string): Promise<UserM>;
  getUserByEmail(email: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  updateProfile(email: string, payload: UserUpdateProfilePayload): Promise<UserM>;
  updatePassword(email: string, password: string): Promise<void>;
  getUserLogin(email: string): Promise<UserM>;
  getUserById(id: number): Promise<UserM>;
  getUsersByIds(ids: number[]): Promise<UserM[]>;
}
