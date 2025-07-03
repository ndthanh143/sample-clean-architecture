import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { ProductPlan } from '../entities/product-plan.entity';
import { ProductPlanM } from '@/domain/model/product-plan';
import {
  AddProductPlanDto,
  UpdateProductPlanDto,
} from '../controllers/product-plan/product-plan.dto';

@Injectable()
export class ProductPlanProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ProductPlan, ProductPlanM);
      createMap(mapper, ProductPlanM, ProductPlan);
      createMap(mapper, AddProductPlanDto, ProductPlanM);
      createMap(mapper, UpdateProductPlanDto, ProductPlanM);
    };
  }
}
