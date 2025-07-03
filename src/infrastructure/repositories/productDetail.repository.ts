import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductDetailRepository } from '@/domain/repositories/productDetailRepository.interface';
import { ProductDetail } from '../entities/product-detail.entity';
import { ProductDetailM } from '@/domain/model/product-detail';

@Injectable()
export class DatabaseProductDetailRepository implements ProductDetailRepository {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly repository: Repository<ProductDetail>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(product: ProductDetailM): Promise<ProductDetailM> {
    const entity = this.mapper.map(product, ProductDetailM, ProductDetail);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, ProductDetail, ProductDetailM);
  }

  async findAll(
    page: number,
    limit: number,
    productId?: number,
    q?: string,
    userId?: number,
  ): Promise<[ProductDetailM[], number]> {
    const qb = this.repository
      .createQueryBuilder('product_detail')
      .leftJoinAndSelect('product_detail.product', 'product')
      .leftJoinAndSelect('product_detail.userProductDetails', 'userProductDetails')
      .leftJoinAndSelect('userProductDetails.user', 'user')
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(id)')
            .from('user_product_detail', 'upd')
            .where('upd.product_detail_id = product_detail.id')
            .andWhere('upd.expired_date > NOW()'),
        'sharingUserCount',
      );

    if (productId) {
      qb.andWhere('product_detail.product_id = :productId', { productId });
    }

    if (userId) {
      qb.andWhere(
        `NOT EXISTS (
      SELECT 1 FROM user_product_detail upd
      WHERE upd.product_detail_id = product_detail.id
        AND upd.user_id = :userId
        AND upd.expired_date > NOW()
    )`,
        { userId },
      );
    }

    if (q?.trim()) {
      // search by product name, account email using unaccent
      const searchString = `%${q.trim()}%`;
      qb.andWhere(
        '(unaccent(product.name) ILIKE unaccent(:searchString) OR unaccent(product_detail.email) ILIKE unaccent(:searchString))',
        { searchString },
      );
    }

    qb.addOrderBy('product_detail.createdDate', 'ASC');

    qb.skip((page - 1) * limit).take(limit);

    // Use raw and entities to get custom field
    const { entities, raw } = await qb.getRawAndEntities();
    const total = await qb.getCount(); // still use getCount() for pagination

    const mapped = await this.mapper.mapArrayAsync(entities, ProductDetail, ProductDetailM);

    mapped.forEach((item, idx) => {
      const rawItem = raw[idx];
      item.sharingUserCount = Number(rawItem?.sharingUserCount || 0);
    });

    return [mapped, total];
  }

  async findAllForGranting(
    page: number,
    limit: number,
    productId?: number,
    variantId?: number,
    q?: string,
    grantingUserId?: number,
  ): Promise<[ProductDetailM[], number]> {
    const qb = this.repository
      .createQueryBuilder('product_detail')
      .leftJoinAndSelect('product_detail.product', 'product')
      .leftJoinAndSelect('product.productVariants', 'productVariants')
      .leftJoinAndSelect('product_detail.userProductDetails', 'userProductDetails')
      .leftJoinAndSelect('userProductDetails.user', 'user')
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(*)')
            .from('user_product_detail', 'upd')
            .where('upd.product_detail_id = product_detail.id')
            .andWhere('upd.expired_date > NOW()'),
        'sharingUserCount',
      );

    if (productId) {
      qb.andWhere('product_detail.product_id = :productId', { productId });
    }

    if (grantingUserId) {
      qb.andWhere(
        `NOT EXISTS (
      SELECT 1 FROM user_product_detail upd
      WHERE upd.product_detail_id = product_detail.id
        AND upd.user_id = :userId
        AND upd.expired_date > NOW()
    )`,
        { userId: grantingUserId },
      );
    }

    if (q?.trim()) {
      // search by product name, account email using unaccent
      const searchString = `%${q.trim()}%`;
      qb.andWhere(
        '(unaccent(product.name) ILIKE unaccent(:searchString) OR unaccent(product_detail.email) ILIKE unaccent(:searchString))',
        { searchString },
      );
    }

    qb.skip((page - 1) * limit).take(limit);

    // Use raw and entities to get custom field
    const { entities, raw } = await qb.getRawAndEntities();
    const total = await qb.getCount(); // still use getCount() for pagination

    const mapped = await this.mapper.mapArrayAsync(entities, ProductDetail, ProductDetailM);

    mapped.forEach((item, idx) => {
      const rawItem = raw[idx];
      item.sharingUserCount = Number(rawItem?.sharingUserCount || 0);
    });

    return [mapped, total];
  }

  async findById(id: number): Promise<ProductDetailM> {
    const qb = this.repository.createQueryBuilder('product_detail');
    qb.where('product_detail.id = :id', { id });
    qb.leftJoinAndSelect('product_detail.product', 'product');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`ProductDetail with ID ${id} not found`);
    }
    return this.mapper.map(entity, ProductDetail, ProductDetailM);
  }

  async findByIdToSendEmail(id: number): Promise<ProductDetailM> {
    const qb = this.repository.createQueryBuilder('product_detail');
    qb.where('product_detail.id = :id', { id });
    qb.leftJoinAndSelect('product_detail.product', 'product');
    qb.leftJoinAndSelect('product_detail.userProductDetails', 'userProductDetails');
    qb.leftJoinAndSelect('userProductDetails.user', 'user');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`ProductDetail with ID ${id} not found`);
    }
    return this.mapper.map(entity, ProductDetail, ProductDetailM);
  }

  async findByIds(ids: number[]): Promise<ProductDetailM[]> {
    const qb = this.repository.createQueryBuilder('product_detail');
    qb.where('product_detail.id IN (:...ids)', { ids });
    qb.leftJoinAndSelect('product_detail.product', 'product');

    const entities = await qb.getMany();
    if (!entities) {
      throw new NotFoundException(`ProductDetail with IDs ${ids} not found`);
    }
    return this.mapper.mapArray(entities, ProductDetail, ProductDetailM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, product: ProductDetailM): Promise<void> {
    const entity = this.mapper.map(product, ProductDetailM, ProductDetail);
    await this.repository.update({ id }, entity);
  }
}
