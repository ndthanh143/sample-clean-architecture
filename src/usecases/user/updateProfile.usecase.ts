import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserWithoutPassword } from '@/domain/model/user';
import { UpdateUserDto } from '@/infrastructure/controllers/user/user.dto';

export class updateProfileUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, payload: UpdateUserDto): Promise<UserWithoutPassword> {
    const user = await this.userRepository.updateProfile(email, payload);
    if (!user) {
      this.logger.log('updateProfileUsecases execute', 'User not found');
      return null;
    }
    const { password, ...info } = user;
    this.logger.log('updateProfileUsecases execute', 'User found');
    return info;
  }
}
