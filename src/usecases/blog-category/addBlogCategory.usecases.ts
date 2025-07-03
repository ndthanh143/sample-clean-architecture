import { ILogger } from '@/domain/logger/logger.interface';
import { BlogCategoryM } from '@/domain/model/blog-category';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';
import { AddBlogCategoryDto } from '@/infrastructure/controllers/blog-category/blog-category.dto';
import { Mapper } from '@automapper/core';

export class AddBlogCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: BlogCategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddBlogCategoryDto): Promise<BlogCategoryM> {
    const item = this.mapper.map(payload, AddBlogCategoryDto, BlogCategoryM);

    const result = await this.repo.insert(item);
    this.logger.log('AddBlogCategoryUseCases execute', 'New item have been inserted');
    return result;
  }
}
