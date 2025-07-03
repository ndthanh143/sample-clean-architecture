import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { Discount } from '../entities/discount.entity';
import { DiscountM } from '@/domain/model/discount';
import { AddDiscountDto, UpdateDiscountDto } from '../controllers/discount/discount.dto';

@Injectable()
export class DiscountProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Discount, DiscountM);
      createMap(mapper, DiscountM, Discount);
      createMap(mapper, AddDiscountDto, DiscountM);
      createMap(mapper, UpdateDiscountDto, DiscountM);
    };
  }
}
