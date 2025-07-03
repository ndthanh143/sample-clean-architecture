import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemM } from '@/domain/model/order-item';

@Injectable()
export class OrderItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, OrderItem, OrderItemM);
      createMap(mapper, OrderItemM, OrderItem);
      // createMap(mapper, UpdateOrderDto, OrderItemM);
      // createMap(mapper, AddOrderDto, OrderItemM);
    };
  }
}
