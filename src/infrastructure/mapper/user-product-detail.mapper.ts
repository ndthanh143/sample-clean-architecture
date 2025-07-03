import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';

import { UserProductDetail } from '../entities/user-product-detail.entity';
import { UserProductDetailM } from '@/domain/model/user-product-detail';
import {
  AddUserProductDetailDto,
  UpdateUserProductDetailDto,
} from '../controllers/user-product-detail/user-product-detail.dto';

@Injectable()
export class UserProductDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        UserProductDetail,
        UserProductDetailM,
        forMember(
          (destination) => destination.productDetail,
          mapFrom((source) => source.productDetail),
        ),
        forMember(
          (destination) => destination.user,
          mapFrom((source) => source.user),
        ),
        forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order),
        ),
      );
      createMap(
        mapper,
        UserProductDetailM,
        UserProductDetail,
        forMember(
          (destination) => destination.productDetail,
          mapFrom((source) => source.productDetail),
        ),
        forMember(
          (destination) => destination.user,
          mapFrom((source) => source.user),
        ),
        forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order),
        ),
      );
      createMap(mapper, UpdateUserProductDetailDto, UserProductDetailM);
      createMap(mapper, AddUserProductDetailDto, UserProductDetailM);
    };
  }
}
