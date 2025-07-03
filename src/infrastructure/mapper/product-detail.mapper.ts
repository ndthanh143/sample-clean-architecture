import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { ProductDetailM } from '@/domain/model/product-detail';
import { ProductDetail } from '../entities/product-detail.entity';
import {
  AddProductDetailDto,
  UpdateProductDetailDto,
} from '../controllers/product-detail/product-detail.dto';

@Injectable()
export class ProductDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ProductDetail,
        ProductDetailM,
        forMember(
          (destination) => destination.userProductDetails,
          mapFrom((source) => source.userProductDetails),
        ),
      );
      createMap(
        mapper,
        ProductDetailM,
        ProductDetail,
        forMember(
          (destination) => destination.userProductDetails,
          mapFrom((source) => source.userProductDetails),
        ),
      );
      createMap(mapper, UpdateProductDetailDto, ProductDetailM);
      createMap(mapper, AddProductDetailDto, ProductDetailM);
    };
  }
}
