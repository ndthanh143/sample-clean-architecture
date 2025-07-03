import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';
import { UpdateProductPlanDto } from '@/infrastructure/controllers/product-plan/product-plan.dto';
import { ProductPlanM } from '@/domain/model/product-plan';

export class UpdateProductPlanUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: ProductPlanRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(id: number, payload: UpdateProductPlanDto): Promise<void> {
    const item = this.mapper.map(payload, UpdateProductPlanDto, ProductPlanM);
    this.repo.update(id, item);
    this.logger.log('UpdateProductPlanUseCases execute', `Product Plan ${id} have been updated`);
  }
}
