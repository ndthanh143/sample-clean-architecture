import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { Category } from '../entities/category.entity';
import { CategoryM } from '@/domain/model/category';
import { AddCategoryDto, UpdateCategoryDto } from '../controllers/category/category-dto';

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Category, CategoryM);
      createMap(mapper, CategoryM, Category);
      createMap(mapper, UpdateCategoryDto, CategoryM);
      createMap(mapper, AddCategoryDto, CategoryM);
    };
  }
}
