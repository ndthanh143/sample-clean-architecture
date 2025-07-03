import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { BlogCategory } from '../entities/blog-category.entity';
import { BlogCategoryM } from '@/domain/model/blog-category';
import { BlogCategoryRepository } from '@/domain/repositories/blogCategoryRepository.interface';

@Injectable()
export class DatabaseBlogCategoryRepository implements BlogCategoryRepository {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly repository: Repository<BlogCategory>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(category: BlogCategoryM): Promise<BlogCategoryM> {
    const entity = this.mapper.map(category, BlogCategoryM, BlogCategory);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, BlogCategory, BlogCategoryM);
  }

  async findAll(page: number, limit: number, search: string): Promise<BlogCategoryM[]> {
    const qb = this.repository.createQueryBuilder('blog_category');

    if (search) {
      qb.where('unaccent(blog_category.name) ILIKE unaccent(:search)', { search: `%${search}%` });
    }

    qb.skip((page - 1) * limit).take(limit);

    const categories = await qb.getMany();

    return this.mapper.mapArrayAsync(categories, BlogCategory, BlogCategoryM);
  }

  async findById(id: number): Promise<BlogCategoryM> {
    const qb = this.repository.createQueryBuilder('blog_category');
    qb.where('blog_category.id = :id', { id });

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`BlogCategory with ID ${id} not found`);
    }
    return this.mapper.map(entity, BlogCategory, BlogCategoryM);
  }

  async findBySlug(slug: string): Promise<BlogCategoryM> {
    const qb = this.repository.createQueryBuilder('blog_category');
    qb.where('blog_category.slug = :slug', { slug });

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`BlogCategory with Slug ${slug} not found`);
    }
    return this.mapper.map(entity, BlogCategory, BlogCategoryM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, data: BlogCategoryM): Promise<void> {
    const entity = this.mapper.map(data, BlogCategoryM, BlogCategory);
    await this.repository.update({ id }, entity);
  }
}
