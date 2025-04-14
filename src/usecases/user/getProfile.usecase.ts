import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserWithoutPassword } from '@/domain/model/user';

export class getUserProfileUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      this.logger.log('getUserProfileUsecasesProxy execute', 'User not found');
      return null;
    }
    const { password, ...info } = user;
    this.logger.log('getUserProfileUsecasesProxy execute', 'User found');
    return info;
  }
}
