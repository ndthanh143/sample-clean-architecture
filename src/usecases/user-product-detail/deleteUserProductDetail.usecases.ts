import { ILogger } from '../../domain/logger/logger.interface';
import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';

export class DeleteUserProductDetailUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: UserProductDetailRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
    this.logger.log('DeleteUserProductDetailUseCases execute', `Item ${id} have been deleted`);
  }
}
