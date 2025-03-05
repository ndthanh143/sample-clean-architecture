import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserM } from 'src/domain/model/user';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(user: UserM): Promise<UserM> {
    const todoEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.insert(todoEntity);
    return this.toUser(result.generatedMaps[0] as User);
  }

  private toUser(userEntity: User): UserM {
    const user: UserM = new UserM();

    user.id = userEntity.id;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.email = userEntity.email;
    user.password = userEntity.password;
    user.createdDate = userEntity.createdDate;
    user.updatedDate = userEntity.updatedDate;

    return user;
  }

  private toUserEntity(user: UserM): User {
    const userEntity: User = new User();

    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.password = user.password;

    return userEntity;
  }
}
