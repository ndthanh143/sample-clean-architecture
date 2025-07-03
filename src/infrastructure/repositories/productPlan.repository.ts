import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductPlan } from '../entities/product-plan.entity';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';
import { ProductPlanM } from '@/domain/model/product-plan';

@Injectable()
export class DatabaseProductPlanRepository implements ProductPlanRepository {
  constructor(
    @InjectRepository(ProductPlan)
    private readonly repo: Repository<ProductPlan>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findById(id: number): Promise<ProductPlanM | null> {
    const entity = await this.repo.findOne({ where: { id }, relations: ['productVariant'] });
    return entity ? this.mapper.map(entity, ProductPlan, ProductPlanM) : null;
  }

  async findByVariantId(variantId: number): Promise<ProductPlanM[]> {
    const entities = await this.repo.find({
      where: { productVariant: { id: variantId } },
      relations: ['productVariant'],
    });
    return this.mapper.mapArray(entities, ProductPlan, ProductPlanM);
  }

  async insert(data: Partial<ProductPlanM>): Promise<ProductPlanM> {
    const entity = this.mapper.map(data, ProductPlanM, ProductPlan);
    const saved = await this.repo.save(entity);
    return this.mapper.map(saved, ProductPlan, ProductPlanM);
  }

  async update(id: number, data: Partial<ProductPlanM>): Promise<ProductPlanM> {
    await this.repo.update({ id }, this.mapper.map(data, ProductPlanM, ProductPlan));
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`ProductPlan with ID ${id} not found`);
    return this.mapper.map(updated, ProductPlan, ProductPlanM);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
