import { BlogCategoryM } from '../model/blog-category';

export interface BlogCategoryRepository {
  insert(data: BlogCategoryM): Promise<BlogCategoryM>;
  findAll(page: number, limit: number, search: string): Promise<BlogCategoryM[]>;
  findById(id: number): Promise<BlogCategoryM>;
  findBySlug(slug: string): Promise<BlogCategoryM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: BlogCategoryM): Promise<void>;
}
