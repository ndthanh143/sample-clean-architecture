import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Payment } from '../entities/payment.entity';
import { PaymentM } from '@/domain/model/payment';
import { AddPaymentDto } from '../controllers/payment/payment.dto';

@Injectable()
export class PaymentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Payment,
        PaymentM,
        forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order),
        ),
      );
      createMap(
        mapper,
        PaymentM,
        Payment,
        forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order),
        ),
      );
      createMap(mapper, AddPaymentDto, PaymentM);
    };
  }
}
