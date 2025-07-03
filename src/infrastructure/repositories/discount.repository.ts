import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { Discount } from '../entities/discount.entity';
import { DiscountRepository } from '@/domain/repositories/discountRepository.interface';
import { DiscountM } from '@/domain/model/discount';

@Injectable()
export class DatabaseDiscountRepository implements DiscountRepository {
  constructor(
    @InjectRepository(Discount)
    private readonly repo: Repository<Discount>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findById(id: number): Promise<DiscountM | null> {
    const entity = await this.repo.findOne({ where: { id }, relations: ['products'] });
    return entity ? this.mapper.map(entity, Discount, DiscountM) : null;
  }

  async findAll(page: number, limit: number): Promise<[DiscountM[], number]> {
    const [entities, total] = await this.repo.findAndCount({
      relations: ['products'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const mapped = await this.mapper.mapArrayAsync(entities, Discount, DiscountM);
    return [mapped, total];
  }

  async findActiveDiscounts(): Promise<DiscountM[]> {
    const now = new Date();
    const entities = await this.repo
      .createQueryBuilder('discount')
      .where('discount.startDate <= :now AND discount.endDate >= :now', { now })
      .getMany();
    return this.mapper.mapArray(entities, Discount, DiscountM);
  }

  async insert(data: Partial<DiscountM>): Promise<DiscountM> {
    const entity = this.mapper.map(data, DiscountM, Discount);
    const saved = await this.repo.save(entity);
    return this.mapper.map(saved, Discount, DiscountM);
  }

  async update(id: number, data: Partial<DiscountM>): Promise<DiscountM> {
    await this.repo.update({ id }, this.mapper.map(data, DiscountM, Discount));
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`Discount with ID ${id} not found`);
    return this.mapper.map(updated, Discount, DiscountM);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
