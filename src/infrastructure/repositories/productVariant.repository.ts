import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductVariant } from '../entities/product-variant.entity';
import { ProductVariantRepository } from '@/domain/repositories/productVariantRepository.interface';
import { ProductVariantM } from '@/domain/model/product-variant';

@Injectable()
export class DatabaseProductVariantRepository implements ProductVariantRepository {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly repo: Repository<ProductVariant>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findById(id: number): Promise<ProductVariantM | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.mapper.map(entity, ProductVariant, ProductVariantM) : null;
  }

  async findAll(page: number, limit: number): Promise<[ProductVariantM[], number]> {
    const [entities, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    const mapped = await this.mapper.mapArrayAsync(entities, ProductVariant, ProductVariantM);
    return [mapped, total];
  }

  async insert(data: Partial<ProductVariantM>): Promise<ProductVariantM> {
    const entity = this.mapper.map(data, ProductVariantM, ProductVariant);
    const saved = await this.repo.save(entity);
    return this.mapper.map(saved, ProductVariant, ProductVariantM);
  }

  async update(id: number, data: Partial<ProductVariantM>): Promise<ProductVariantM> {
    await this.repo.update({ id }, this.mapper.map(data, ProductVariantM, ProductVariant));
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`ProductVariant with ID ${id} not found`);
    return this.mapper.map(updated, ProductVariant, ProductVariantM);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
