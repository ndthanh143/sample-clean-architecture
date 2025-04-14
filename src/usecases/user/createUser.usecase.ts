import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '@/domain/model/user';
import { BcryptService } from '@/infrastructure/services/bcrypt/bcrypt.service';

export class createUserUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bycryptService: BcryptService,
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<UserM> {
    const user = new UserM();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await this.bycryptService.hash(password);

    const result = await this.userRepository.insert(user);
    this.logger.log('createUserUsecases execute', 'New user have been inserted');
    return result;
  }
}
