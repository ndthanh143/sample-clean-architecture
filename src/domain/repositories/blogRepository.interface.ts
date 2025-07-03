import { BlogM } from '../model/blog';

export interface BlogRepository {
  insert(data: BlogM): Promise<BlogM>;
  findAll(
    page: number,
    limit: number,
    categoryId: number,
    search: string,
  ): Promise<[BlogM[], number]>;
  findById(id: number): Promise<BlogM>;
  findBySlug(slug: string): Promise<BlogM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: BlogM): Promise<void>;
}
