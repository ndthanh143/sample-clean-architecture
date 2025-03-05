import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
//   findAll(): Promise<TodoM[]>;
//   findById(id: number): Promise<TodoM>;
//   updateContent(id: number, isDone: boolean): Promise<void>;
//   deleteById(id: number): Promise<void>;
}
