import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { FileRepository } from '@/domain/repositories/fileRepository.interface';
import { File } from '../entities/file.entity';
import { FileM } from '@/domain/model/file';

@Injectable()
export class DatabaseFileRepository implements FileRepository {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(category: FileM): Promise<FileM> {
    const entity = this.mapper.map(category, FileM, File);
    const result = await this.repository.save(entity);
    return this.mapper.map(result, File, FileM);
  }

  async findAll(): Promise<FileM[]> {
    const entities = await this.repository.find();
    return this.mapper.mapArrayAsync(entities, File, FileM);
  }

  async findById(id: number): Promise<FileM> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return this.mapper.map(entity, File, FileM);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
