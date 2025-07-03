import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Review } from '../entities/review.entity';
import { ReviewM } from '@/domain/model/review';
import { AddReviewDto, UpdateReviewDto } from '../controllers/review/review.dto';

@Injectable()
export class ReviewProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Review,
        ReviewM,
        forMember(
          (dest) => dest.product,
          mapFrom((src) => src.product),
        ),
      );
      createMap(
        mapper,
        ReviewM,
        Review,
        forMember(
          (dest) => dest.product,
          mapFrom((src) => src.product),
        ),
      );
      createMap(mapper, UpdateReviewDto, ReviewM);
      createMap(mapper, AddReviewDto, ReviewM);
    };
  }
}
