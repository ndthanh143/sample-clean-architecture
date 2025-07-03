import { ProductPlanM } from '../model/product-plan';

export interface ProductPlanRepository {
  findById(id: number): Promise<ProductPlanM | null>;
  findByVariantId(variantId: number): Promise<ProductPlanM[]>;
  insert(data: ProductPlanM): Promise<ProductPlanM>;
  update(id: number, data: Partial<ProductPlanM>): Promise<ProductPlanM>;
  delete(id: number): Promise<void>;
}
