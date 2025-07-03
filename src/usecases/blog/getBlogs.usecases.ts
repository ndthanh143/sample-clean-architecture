import { BlogRepository } from '@/domain/repositories/blogRepository.interface';
import { createPaginationMeta } from '@/utils';

export class GetBlogsUseCases {
  constructor(private readonly repo: BlogRepository) {}

  async execute(page: number, limit: number, categoryId: number, search: string) {
    const [data, total] = await this.repo.findAll(page, limit, categoryId, search);
    return {
      data,
      meta: createPaginationMeta(total, page, limit),
    };
  }
}
