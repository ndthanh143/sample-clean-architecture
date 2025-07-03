import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';

import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';
import { UserProductDetail } from '../entities/user-product-detail.entity';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { AccountSortBy } from '../controllers/user-product-detail/user-product-detail.dto';

@Injectable()
export class DatabaseUserProductDetailRepository implements UserProductDetailRepository {
  constructor(
    @InjectRepository(UserProductDetail)
    private readonly repository: Repository<UserProductDetail>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(data: UserProductDetailM): Promise<UserProductDetailM> {
    const entity = this.mapper.map(data, UserProductDetailM, UserProductDetail);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, UserProductDetail, UserProductDetailM);
  }

  async insertBulk(data: UserProductDetailM[]): Promise<UserProductDetailM[]> {
    const entities = this.mapper.mapArray(data, UserProductDetailM, UserProductDetail);
    const result = await this.repository.save(entities);
    return this.mapper.mapArray(result, UserProductDetail, UserProductDetailM);
  }

  async findAll(
    page: number,
    limit: number,
    userId?: number,
    productDetailId?: number,
  ): Promise<[UserProductDetailM[], number]> {
    const qb = this.repository.createQueryBuilder('user_product_detail');

    if (userId) {
      qb.andWhere('user_product_detail.user_id = :userId', { userId });
    }

    if (productDetailId) {
      qb.andWhere('user_product_detail.product_detail_id = :productDetailId', { productDetailId });
    }

    qb.leftJoinAndSelect('user_product_detail.user', 'user');
    qb.leftJoinAndSelect('user_product_detail.productDetail', 'productDetail');
    qb.leftJoinAndSelect('productDetail.product', 'product');

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, UserProductDetail, UserProductDetailM);

    return [mapped, total];
  }

  async findAllAndHandleExipred(
    page: number,
    limit: number,
    userId?: number,
    productDetailId?: number,
    status?: 'expired' | 'active',
    q?: string,
    sortBy?: AccountSortBy,
  ): Promise<[UserProductDetailM[], number]> {
    const qb = this.repository.createQueryBuilder('user_product_detail');

    if (userId) {
      qb.andWhere('user_product_detail.user_id = :userId', { userId });
    }

    if (productDetailId) {
      qb.andWhere('user_product_detail.product_detail_id = :productDetailId', { productDetailId });
    }

    if (status === 'expired') {
      qb.andWhere('user_product_detail.expired_date < NOW()');
    } else if (status === 'active') {
      qb.andWhere('user_product_detail.expired_date >= NOW()');
    }

    qb.leftJoinAndSelect('user_product_detail.user', 'user');
    qb.leftJoinAndSelect('user_product_detail.productDetail', 'productDetail');
    qb.leftJoinAndSelect('productDetail.product', 'product');
    qb.leftJoinAndSelect('user_product_detail.order', 'order');

    if (q?.trim()) {
      const trimmedQuery = q.trim();
      qb.andWhere('unaccent(product.name) ILIKE unaccent(:query)', {
        query: `%${trimmedQuery}%`,
      });
    }

    const sortOptions: Record<
      NonNullable<typeof sortBy>,
      { column: string; order: 'ASC' | 'DESC' }
    > = {
      'date-asc': { column: 'user_product_detail.createdDate', order: 'ASC' },
      'date-desc': { column: 'user_product_detail.createdDate', order: 'DESC' },
    };
    const selectedSort = sortOptions[sortBy ?? 'date-desc'];
    qb.orderBy(selectedSort.column, selectedSort.order);

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const now = new Date();
    const result = entities.map((item) => {
      const isExpired = new Date(item.expiredDate) < now;
      if (isExpired) {
        item.productDetail.email = null;
        item.productDetail.password = null;
      }
      return item;
    });

    const mapped = await this.mapper.mapArrayAsync(result, UserProductDetail, UserProductDetailM);

    return [mapped, total];
  }

  async findById(id: number): Promise<UserProductDetailM> {
    const qb = this.repository.createQueryBuilder('user_product_detail');
    qb.where('user_product_detail.id = :id', { id });
    qb.leftJoinAndSelect('user_product_detail.user', 'user');
    qb.leftJoinAndSelect('user_product_detail.product', 'product');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`UserProductDetail with ID ${id} not found`);
    }
    return this.mapper.map(entity, UserProductDetail, UserProductDetailM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, data: UserProductDetailM): Promise<void> {
    const entity = this.mapper.map(data, UserProductDetailM, UserProductDetail);
    await this.repository.update({ id }, entity);
  }
}
