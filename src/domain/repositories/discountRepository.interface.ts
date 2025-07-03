import { DiscountM } from '../model/discount';

export interface DiscountRepository {
  findById(id: number): Promise<DiscountM | null>;
  findAll(page: number, limit: number): Promise<[DiscountM[], number]>;
  findActiveDiscounts(): Promise<DiscountM[]>;
  insert(data: DiscountM): Promise<DiscountM>;
  update(id: number, data: Partial<DiscountM>): Promise<DiscountM>;
  delete(id: number): Promise<void>;
}
