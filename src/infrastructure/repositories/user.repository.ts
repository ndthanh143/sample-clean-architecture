import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserRepository } from '@/domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserM } from '@/domain/model/user';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.mapper.map(user, UserM, User);
    const result = await this.userEntityRepository.save(userEntity);
    return this.mapper.map(result, User, UserM);
  }
  async createGoogleUser(email: string, name: string, picture: string): Promise<UserM> {
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.pop();
    const lastName = nameParts.join(' ');

    const userEntity = this.userEntityRepository.create({
      email,
      firstName,
      lastName,
      avatarUrl: picture,
    });

    const result = await this.userEntityRepository.save(userEntity);
    return this.mapper.map(result, User, UserM);
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
        email,
      },
    });

    if (!userEntity) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.mapper.map(userEntity, User, UserM);
  }

  async getUserById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        id,
      },
    });

    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.mapper.map(userEntity, User, UserM);
  }

  async getUsersByIds(ids: number[]): Promise<UserM[]> {
    const userEntities = await this.userEntityRepository.findBy({ id: In(ids) });

    if (!userEntities || userEntities.length === 0) {
      throw new NotFoundException(`Users with ids ${ids.join(', ')} not found`);
    }
    return this.mapper.mapArray(userEntities, User, UserM);
  }

  async getUserLogin(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!userEntity) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.mapper.map(userEntity, User, UserM);
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
    return this.mapper.map(user, User, UserM);
  }

  async updateLastLogin(email: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email: email,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }
}
