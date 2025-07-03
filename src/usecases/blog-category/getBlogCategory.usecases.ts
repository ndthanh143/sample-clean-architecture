import { BlogCategoryM } from '@/domain/model/blog-category';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';

export class GetBlogCategoryUseCases {
  constructor(private readonly repo: BlogCategoryRepository) {}

  async execute(id: number): Promise<BlogCategoryM> {
    return await this.repo.findById(id);
  }

  async executeBySlug(slug: string): Promise<BlogCategoryM> {
    return await this.repo.findBySlug(slug);
  }
}
