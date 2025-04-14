import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Product } from '../entities/product.entity';
import { ProductM } from '@/domain/model/product';
import { AddProductDto, UpdateProductDto } from '../controllers/product/product-dto';

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
      );
      createMap(
        mapper,
        ProductM,
        Product,
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
      );
      createMap(mapper, UpdateProductDto, ProductM);
      createMap(mapper, AddProductDto, ProductM);
    };
  }
}
