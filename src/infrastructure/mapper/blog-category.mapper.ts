import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { BlogCategory } from '../entities/blog-category.entity';
import { BlogCategoryM } from '@/domain/model/blog-category';
import {
  AddBlogCategoryDto,
  UpdateBlogCategoryDto,
} from '../controllers/blog-category/blog-category.dto';

@Injectable()
export class BlogCategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BlogCategory, BlogCategoryM);
      createMap(mapper, BlogCategoryM, BlogCategory);
      createMap(mapper, UpdateBlogCategoryDto, BlogCategoryM);
      createMap(mapper, AddBlogCategoryDto, BlogCategoryM);
    };
  }
}
