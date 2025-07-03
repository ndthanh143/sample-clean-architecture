import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Order } from '../entities/order.entity';
import { OrderM } from '@/domain/model/order';
import { AddOrderDto, UpdateOrderDto } from '../controllers/order/order.dto';

@Injectable()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Order,
        OrderM,
        forMember(
          (destination) => destination.items,
          mapFrom((source) => source.items),
        ),
        forMember(
          (destination) => destination.userProductDetails,
          mapFrom((source) => source.userProductDetails),
        ),
      );
      createMap(
        mapper,
        OrderM,
        Order,
        forMember(
          (destination) => destination.items,
          mapFrom((source) => source.items),
        ),
        forMember(
          (destination) => destination.userProductDetails,
          mapFrom((source) => source.userProductDetails),
        ),
      );
      createMap(mapper, UpdateOrderDto, OrderM);
      createMap(mapper, AddOrderDto, OrderM);
    };
  }
}
