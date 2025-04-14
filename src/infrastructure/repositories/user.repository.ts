import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserM } from '@/domain/model/user';

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
    user.phone = userEntity.phone;
    user.birthday = userEntity.birthday;
    user.avatarUrl = userEntity.avatarUrl;
    user.lastLogin = userEntity.lastLogin;

    return user;
  }

  async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email: email,
      },
      { hachRefreshToken: refreshToken },
    );
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async getUserLogin(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email: email,
      },
      { password: password },
    );
  }

  async updateProfile(email: string, payload: UserM): Promise<UserM> {
    console.log('payload', payload);
    const user = await this.userEntityRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.phone = payload.phone;
    user.birthday = payload.birthday;
    user.avatarUrl = payload.avatarUrl;
    await this.userEntityRepository.save(user);
    return this.toUser(user);
  }

  async updateLastLogin(email: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email: email,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUserEntity(user: UserM): User {
    const userEntity: User = new User();

    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.phone = user.phone;
    userEntity.birthday = user.birthday;
    userEntity.avatarUrl = user.avatarUrl;
    userEntity.lastLogin = user.lastLogin;

    return userEntity;
  }
}
