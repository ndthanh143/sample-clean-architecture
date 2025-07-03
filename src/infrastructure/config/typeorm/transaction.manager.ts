// src/infrastructure/database/transaction-manager.ts

import { ITransactionManager } from '@/domain/ports/transaction-manager.interface';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TypeOrmTransactionManager implements ITransactionManager {
  constructor(private readonly dataSource: DataSource) {}

  async execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (manager) => {
      return work(manager);
    });
  }
}
