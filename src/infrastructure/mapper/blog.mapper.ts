import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { Blog } from '../entities/blog.entity';
import { BlogM } from '@/domain/model/blog';
import { AddBlogDto, UpdateBlogDto } from '../controllers/blog/blog-dto';

@Injectable()
export class BlogProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Blog,
        BlogM,
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
      );
      createMap(
        mapper,
        BlogM,
        Blog,
        forMember(
          (dest) => dest.category,
          mapFrom((src) => src.category),
        ),
      );
      createMap(mapper, UpdateBlogDto, BlogM);
      createMap(mapper, AddBlogDto, BlogM);
    };
  }
}
