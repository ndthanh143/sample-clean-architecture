import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { Product } from '../entities/product.entity';
import { ProductM } from '@/domain/model/product';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(product: ProductM): Promise<ProductM> {
    const entity = this.mapper.map(product, ProductM, Product);
    const result = await this.repository.insert(entity);
    return this.mapper.map(result.generatedMaps[0] as Product, Product, ProductM);
  }

  async findAll(page: number, limit: number, categoryId: number): Promise<ProductM[]> {
    const qb = this.repository.createQueryBuilder('product');

    if (categoryId) {
      qb.andWhere('product.category_id = :categoryId', { categoryId });
    }

    qb.skip((page - 1) * limit).take(limit);

    const products = await qb.getMany();

    return this.mapper.mapArrayAsync(products, Product, ProductM);
  }

  async findById(id: number): Promise<ProductM> {
    const qb = this.repository.createQueryBuilder('product');
    qb.where('product.id = :id', { id });
    qb.leftJoinAndSelect('product.category', 'category');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.mapper.map(entity, Product, ProductM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, product: ProductM): Promise<void> {
    const entity = this.mapper.map(product, ProductM, Product);
    await this.repository.update({ id }, entity);
  }
}
