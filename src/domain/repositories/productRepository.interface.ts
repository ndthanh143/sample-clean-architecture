import { ProductM } from '@/domain/model/product';

export interface ProductRepository {
  insert(data: ProductM): Promise<ProductM>;
  findAll(
    page: number,
    limit: number,
    categoryId: number,
    q: string,
    sortBy: 'a-z' | 'popular' | 'newest' | 'price-asc' | 'price-desc',
    minPrice: number,
    maxPrice: number,
  ): Promise<[ProductM[], number]>;
  findAllPublished(
    page: number,
    limit: number,
    categoryId: number,
    q: string,
    sortBy: 'a-z' | 'popular' | 'newest' | 'price-asc' | 'price-desc',
    minPrice: number,
    maxPrice: number,
  ): Promise<[ProductM[], number]>;
  findRelativeProducts(page: number, limit: number, slug: string): Promise<[ProductM[], number]>;
  findById(id: number): Promise<ProductM>;
  findBySlug(slug: string): Promise<ProductM>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, data: ProductM): Promise<void>;
  recalculatePriceRange(productId: number): Promise<void>;
}
