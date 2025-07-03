import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CategoryM } from '@/domain/model/category';
import { CategoryRepository } from '@/domain/repositories/categoryRepository.interface';
import { Mapper } from '@automapper/core';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(category: CategoryM): Promise<CategoryM> {
    const entity = this.mapper.map(category, CategoryM, Category);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, Category, CategoryM);
  }

  async findAll(): Promise<CategoryM[]> {
    const entities = await this.repository
      .createQueryBuilder('category')
      .loadRelationCountAndMap('category.productCount', 'category.products')
      .getMany();

    return this.mapper.mapArrayAsync(entities, Category, CategoryM);
  }

  async findById(id: number): Promise<CategoryM> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.mapper.map(entity, Category, CategoryM);
  }

  async findBySlug(slug: string): Promise<CategoryM> {
    const entity = await this.repository.findOne({ where: { slug } });
    if (!entity) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }
    return this.mapper.map(entity, Category, CategoryM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, category: CategoryM): Promise<void> {
    const entity = this.mapper.map(category, CategoryM, Category);
    await this.repository.update({ id }, entity);
  }
}
