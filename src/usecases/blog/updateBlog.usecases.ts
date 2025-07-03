import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';
import { BlogRepository } from '@/domain/repositories/blogRepository.interface';
import { UpdateBlogDto } from '@/infrastructure/controllers/blog/blog-dto';
import { BlogM } from '@/domain/model/blog';

export class UpdateBlogUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: BlogRepository,
    private readonly cateRepo: BlogCategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateBlogDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateBlogDto, BlogM);
    if (payload.categoryId) {
      const category = await this.cateRepo.findById(payload.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${payload.categoryId} not found`);
      }

      item.category = category;
    }
    this.repo.updateById(id, item);
    this.logger.log('UpdateBlogUseCases execute', `Blog ${id} have been updated`);
  }
}
