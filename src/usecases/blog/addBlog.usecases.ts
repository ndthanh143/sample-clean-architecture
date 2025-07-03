import { ILogger } from '@/domain/logger/logger.interface';
import { BlogM } from '@/domain/model/blog';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';
import { BlogRepository } from '@/domain/repositories/blogRepository.interface';
import { AddBlogDto } from '@/infrastructure/controllers/blog/blog-dto';
import { Mapper } from '@automapper/core';

export class AddBlogUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly blogRepo: BlogRepository,
    private readonly cateRepo: BlogCategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddBlogDto): Promise<BlogM> {
    const item = this.mapper.map(payload, AddBlogDto, BlogM);

    if (payload.categoryId) {
      const category = await this.cateRepo.findById(payload.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${payload.categoryId} not found`);
      }

      item.category = category;
    }

    const result = await this.blogRepo.insert(item);
    this.logger.log('AddBlogUseCases execute', 'New item have been inserted');
    return result;
  }
}
