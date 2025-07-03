import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { ProductVariant } from '../entities/product-variant.entity';
import { ProductVariantM } from '@/domain/model/product-variant';
import {
  AddProductVariantDto,
  UpdateProductVariantDto,
} from '../controllers/product-variant/product-variant.dto';

@Injectable()
export class ProductVariantProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ProductVariant, ProductVariantM);
      createMap(mapper, ProductVariantM, ProductVariant);
      createMap(mapper, AddProductVariantDto, ProductVariantM);
      createMap(mapper, UpdateProductVariantDto, ProductVariantM);
    };
  }
}
