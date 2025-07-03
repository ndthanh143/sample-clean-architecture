import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { ProductRepository } from '@/domain/repositories/productRepository.interface';
import { Product } from '../entities/product.entity';
import { ProductM } from '@/domain/model/product';

export type ProductSortBy = 'a-z' | 'popular' | 'newest' | 'price-asc' | 'price-desc';

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
    const result = await this.repository.save(entity);
    return this.mapper.map(result, Product, ProductM);
  }

  async findAll(
    page: number,
    limit: number,
    categoryId?: number,
    q?: string,
    sortBy?: ProductSortBy,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[ProductM[], number]> {
    const qb = this.repository.createQueryBuilder('product');

    if (categoryId) {
      qb.andWhere('product.category_id = :categoryId', { categoryId });
    }

    if (minPrice) {
      qb.andWhere('(product.minPrice >= :minPrice OR product.maxPrice >= :minPrice)', { minPrice });
    }
    if (maxPrice) {
      qb.andWhere('(product.minPrice <= :maxPrice OR product.maxPrice <= :maxPrice)', { maxPrice });
    }

    if (q?.trim()) {
      qb.andWhere('unaccent(product.name) ILIKE unaccent(:name)', { name: `%${q.trim()}%` });
    }

    qb.leftJoinAndSelect('product.category', 'category');
    qb.leftJoinAndSelect('product.productVariants', 'productVariant');
    qb.leftJoinAndSelect('productVariant.productPlans', 'productPlan');

    const sortOptions: Record<
      NonNullable<typeof sortBy>,
      { column: string; order: 'ASC' | 'DESC' }
    > = {
      'a-z': { column: 'product.name', order: 'ASC' },
      popular: { column: 'product.name', order: 'DESC' },
      newest: { column: 'product.createdDate', order: 'DESC' },
      'price-asc': { column: 'product.minPrice', order: 'ASC' },
      'price-desc': { column: 'product.minPrice', order: 'DESC' },
    };
    const selectedSort = sortOptions[sortBy ?? 'newest'];
    qb.orderBy(selectedSort.column, selectedSort.order);

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Product, ProductM);
    return [mapped, total];
  }

  async findAllPublished(
    page: number,
    limit: number,
    categoryId?: number,
    q?: string,
    sortBy?: ProductSortBy,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[ProductM[], number]> {
    const qb = this.repository.createQueryBuilder('product');

    if (categoryId) {
      qb.andWhere('product.category_id = :categoryId', { categoryId });
    }

    if (minPrice) {
      qb.andWhere('(product.minPrice >= :minPrice OR product.maxPrice >= :minPrice)', { minPrice });
    }
    if (maxPrice) {
      qb.andWhere('(product.minPrice <= :maxPrice OR product.maxPrice <= :maxPrice)', { maxPrice });
    }

    if (q?.trim()) {
      qb.andWhere('unaccent(product.name) ILIKE unaccent(:name)', { name: `%${q.trim()}%` });
    }

    qb.andWhere('product.isPublished = true');

    qb.leftJoinAndSelect('product.category', 'category');
    qb.leftJoinAndSelect('product.productVariants', 'productVariant');
    qb.leftJoinAndSelect('productVariant.productPlans', 'productPlan');

    const sortOptions: Record<
      NonNullable<typeof sortBy>,
      { column: string; order: 'ASC' | 'DESC' }
    > = {
      'a-z': { column: 'product.name', order: 'ASC' },
      popular: { column: 'product.name', order: 'DESC' },
      newest: { column: 'product.createdDate', order: 'DESC' },
      'price-asc': { column: 'product.minPrice', order: 'ASC' },
      'price-desc': { column: 'product.minPrice', order: 'DESC' },
    };
    const selectedSort = sortOptions[sortBy ?? 'newest'];
    qb.orderBy(selectedSort.column, selectedSort.order);

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Product, ProductM);
    return [mapped, total];
  }

  async findRelativeProducts(
    page: number,
    limit: number,
    slug: string,
  ): Promise<[ProductM[], number]> {
    const currentProduct = await this.repository.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!currentProduct || !currentProduct.category) {
      return [[], 0]; // hoặc throw exception nếu cần
    }

    const categoryId = currentProduct.category.id;

    const qb = this.repository.createQueryBuilder('product');

    qb.where('product.slug != :slug', { slug });
    qb.andWhere('product.category_id = :categoryId', { categoryId });
    qb.andWhere('product.isPublished = true');

    qb.leftJoinAndSelect('product.category', 'category');
    qb.leftJoinAndSelect('product.productVariants', 'productVariant');
    qb.leftJoinAndSelect('productVariant.productPlans', 'productPlan');

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const mapped = await this.mapper.mapArrayAsync(entities, Product, ProductM);
    return [mapped, total];
  }

  async findById(id: number): Promise<ProductM> {
    const qb = this.repository.createQueryBuilder('product');
    qb.where('product.id = :id', { id });
    qb.leftJoinAndSelect('product.category', 'category');
    qb.leftJoinAndSelect('product.productVariants', 'productVariant');
    qb.leftJoinAndSelect('productVariant.productPlans', 'productPlan');

    const entity = await qb.getOne();
    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.mapper.map(entity, Product, ProductM);
  }

  async findBySlug(slug: string): Promise<ProductM> {
    const qb = this.repository.createQueryBuilder('product');
    qb.where('product.slug = :slug', { slug });
    qb.andWhere('product.isPublished = true');
    qb.leftJoinAndSelect('product.category', 'category');
    qb.leftJoinAndSelect('product.productVariants', 'productVariant');
    qb.leftJoinAndSelect('productVariant.productPlans', 'productPlan');

    qb.addOrderBy('productVariant.createdDate', 'ASC');

    qb.addOrderBy('productPlan.createdDate', 'ASC');

    const entity = await qb.getOne();

    if (!entity) {
      throw new NotFoundException(`Product with Slug ${slug} not found`);
    }
    return this.mapper.map(entity, Product, ProductM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async updateById(id: number, product: ProductM): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['productVariants'], // Important for nested updates
    });

    if (!entity) {
      throw new NotFoundException('Product not found');
    }

    const updated = this.mapper.map(product, ProductM, Product);

    // Preserve ID and nested IDs for existing variants
    updated.id = id;

    if (updated.productVariants) {
      updated.productVariants = updated.productVariants.map((variant) => {
        variant.product = entity; // link back to parent
        return variant;
      });
    }

    await this.repository.save(updated); // This will:
    // ✅ Trigger @BeforeUpdate
    // ✅ Cascade nested productVariants
  }

  async recalculatePriceRange(productId: number): Promise<void> {
    const qb = this.repository.createQueryBuilder('product');

    const { minPrice, maxPrice } = await qb
      .select('MIN(plan.price)', 'minPrice')
      .addSelect('MAX(plan.price)', 'maxPrice')
      .leftJoin('product.productVariants', 'variant')
      .leftJoin('variant.productPlans', 'plan')
      .where('product.id = :productId', { productId })
      .getRawOne<{ minPrice: number | null; maxPrice: number | null }>();

    await this.repository.update(productId, {
      minPrice: minPrice ?? 0,
      maxPrice: maxPrice ?? 0,
    });
  }
}
