import { BlogM } from '@/domain/model/blog';
import { BlogRepository } from '@/domain/repositories/blogRepository.interface';

export class GetBlogUseCases {
  constructor(private readonly repo: BlogRepository) {}

  async execute(id: number): Promise<BlogM> {
    return await this.repo.findById(id);
  }

  async executeBySlug(slug: string): Promise<BlogM> {
    return await this.repo.findBySlug(slug);
  }
}
