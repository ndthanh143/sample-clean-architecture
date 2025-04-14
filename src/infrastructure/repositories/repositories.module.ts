import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { Category } from '../entities/category.entity';
import { DatabaseCategoryRepository } from './category.repository';
import { DatabaseProductRepository } from './product.repository';
import { Product } from '../entities/product.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Category, Product])],
  providers: [DatabaseUserRepository, DatabaseCategoryRepository, DatabaseProductRepository],
  exports: [DatabaseUserRepository, DatabaseCategoryRepository, DatabaseProductRepository],
})
export class RepositoriesModule {}
