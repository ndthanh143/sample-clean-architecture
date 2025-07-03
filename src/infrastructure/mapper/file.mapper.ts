import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { File } from '../entities/file.entity';
import { FileM } from '@/domain/model/file';

@Injectable()
export class FileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, File, FileM);
      createMap(mapper, FileM, File);
    };
  }
}
