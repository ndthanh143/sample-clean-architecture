import { ILogger } from '@/domain/logger/logger.interface';
import { Mapper } from '@automapper/core';
import { ProductPlanRepository } from '@/domain/repositories/productPlanRepository.interface';
import { ProductPlanM } from '@/domain/model/product-plan';
import { AddProductPlanDto } from '@/infrastructure/controllers/product-plan/product-plan.dto';

export class AddProductPlanUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productPlanRepo: ProductPlanRepository,
    private readonly mapper: Mapper,
  ) {}

  async execute(payload: AddProductPlanDto): Promise<ProductPlanM> {
    const item = this.mapper.map(payload, AddProductPlanDto, ProductPlanM);

    const result = await this.productPlanRepo.insert(item);
    this.logger.log('AddProductPlanUseCases execute', 'New Product Plan have been inserted');
    return result;
  }
}
