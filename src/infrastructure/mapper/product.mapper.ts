import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Product } from '../entities/product.entity';
import { ProductM } from '@/domain/model/product';
import { AddProductDto, UpdateProductDto } from '../controllers/product/product.dto';
import { ProductPlanM } from '@/domain/model/product-plan';
import { AddProductPlanDto } from '../controllers/product-plan/product-plan.dto';
import { ProductVariantM } from '@/domain/model/product-variant';
import { AddProductVariantDto } from '../controllers/product-variant/product-variant.dto';

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Product,
        ProductM,
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        forMember(
          (dest) => dest.productVariants,
          mapFrom((src) => src.productVariants),
        ),
      );
      createMap(
        mapper,
        ProductM,
        Product,
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
        forMember(
          (dest) => dest.productVariants,
          mapFrom((src) => src.productVariants),
        ),
      );
      createMap(
        mapper,
        UpdateProductDto,
        ProductM,
        forMember(
          (dest) => dest.productVariants,
          mapFrom((src) => src.productVariants),
        ),
      );
      createMap(
        mapper,
        AddProductDto,
        ProductM,
        forMember(
          (dest) => dest.productVariants,
          mapFrom((src) => src.productVariants),
        ),
      );
    };
  }
}
