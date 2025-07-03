import { CategoryM } from '../model/category';

export interface CategoryRepository {
  insert(data: CategoryM): Promise<CategoryM>;
  findAll(): Promise<CategoryM[]>;
  findById(id: number): Promise<CategoryM>;
  findBySlug(slug: string): Promise<CategoryM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: CategoryM): Promise<void>;
}
