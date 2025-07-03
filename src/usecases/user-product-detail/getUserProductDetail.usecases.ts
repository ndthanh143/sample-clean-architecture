import { UserProductDetailM } from '@/domain/model/user-product-detail';
import { UserProductDetailRepository } from '@/domain/repositories/userProductDetailRepository.interface';

export class GetUserProductDetailUseCases {
  constructor(private readonly repo: UserProductDetailRepository) {}

  async execute(id: number): Promise<UserProductDetailM> {
    return await this.repo.findById(id);
  }
}
