import { EntityManager } from 'typeorm';

export interface ITransactionManager {
  execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T>;
}
