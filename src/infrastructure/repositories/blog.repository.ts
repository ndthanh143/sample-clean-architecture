import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { BlogRepository } from '@/domain/repositories/blogRepository.interface';
import { Blog } from '../entities/blog.entity';
import { BlogM } from '@/domain/model/blog';

@Injectable()
export class DatabaseBlogRepository implements BlogRepository {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(blog: BlogM): Promise<BlogM> {
    const entity = this.mapper.map(blog, BlogM, Blog);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, Blog, BlogM);
  }

  async findAll(
    page: number,
    limit: number,
    categoryId: number,
    search: string,
  ): Promise<[BlogM[], number]> {
    const qb = this.repository.createQueryBuilder('blog');

    if (categoryId) {
      qb.andWhere('blog.category_id = :categoryId', { categoryId });
    }
    if (search) {
      qb.andWhere('unaccent(blog.title) ILIKE unaccent(:search)', { search: `%${search}%` });
    }

    qb.leftJoinAndSelect('blog.category', 'category');

    qb.skip((page - 1) * limit).take(limit);

    const [blogs, total] = await qb.getManyAndCount();

    return [await this.mapper.mapArrayAsync(blogs, Blog, BlogM), total];
  }

  async findById(id: number): Promise<BlogM> {
    const qb = this.repository.createQueryBuilder('blog');
    qb.where('blog.id = :id', { id });
    qb.leftJoinAndSelect('blog.category', 'category');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return this.mapper.map(entity, Blog, BlogM);
  }

  async findBySlug(slug: string): Promise<BlogM> {
    const qb = this.repository.createQueryBuilder('blog');
    qb.where('blog.slug = :slug', { slug });
    qb.leftJoinAndSelect('blog.category', 'category');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Blog with Slug ${slug} not found`);
    }
    return this.mapper.map(entity, Blog, BlogM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, data: BlogM): Promise<void> {
    const entity = this.mapper.map(data, BlogM, Blog);
    await this.repository.update({ id }, entity);
  }
}
