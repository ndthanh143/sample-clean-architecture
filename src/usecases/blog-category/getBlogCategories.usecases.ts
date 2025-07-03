import { BlogM } from '@/domain/model/blog';
import { BlogCategoryM } from '@/domain/model/blog-category';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';

export class GetBlogCategoriesUseCases {
  constructor(private readonly repo: BlogCategoryRepository) {}

  async execute(page: number, limit: number, search: string): Promise<BlogCategoryM[]> {
    return await this.repo.findAll(page, limit, search);
  }
}
