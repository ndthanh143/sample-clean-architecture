import { FileM } from '../model/file';

export interface FileRepository {
  insert(data: FileM): Promise<FileM>;
  findAll(): Promise<FileM[]>;
  findById(id: number): Promise<FileM>;
  deleteById(id: number): Promise<void>;
}
