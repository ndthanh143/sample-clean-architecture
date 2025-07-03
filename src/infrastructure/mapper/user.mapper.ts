import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AddBlogDto, UpdateBlogDto } from '../controllers/blog/blog-dto';
import { User } from '../entities/user.entity';
import { UserM } from '@/domain/model/user';
import { CreateUserDto, UpdateUserDto } from '../controllers/user/user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserM,
        forMember(
          (destination) => destination.roles,
          mapFrom((source) => source.roles),
        ),
      );
      createMap(mapper, UserM, User);
      createMap(mapper, UpdateUserDto, UserM);
      createMap(mapper, CreateUserDto, UserM);
    };
  }
}
