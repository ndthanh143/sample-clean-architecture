import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';
import { UpdateBlogCategoryDto } from '@/infrastructure/controllers/blog-category/blog-category.dto';
import { BlogCategoryM } from '@/domain/model/blog-category';

export class UpdateBlogCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: BlogCategoryRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateBlogCategoryDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateBlogCategoryDto, BlogCategoryM);
    this.repo.updateById(id, item);
    this.logger.log('UpdateBlogCategoryUseCases execute', `Blog Category ${id} have been updated`);
  }
}
