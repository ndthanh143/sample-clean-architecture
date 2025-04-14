import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { createUserUsecases } from '@/usecases/user/createUser.usecase';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { LoginUseCases } from '@/usecases/auth/login.usecases';
import { JwtModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { IsAuthenticatedUseCases } from '@/usecases/auth/isAuthenticated.usecases';
import { getUserProfileUsecases } from '@/usecases/user/getProfile.usecase';
import { LogoutUseCases } from '@/usecases/auth/logout.usecases';
import { updateProfileUsecases } from '@/usecases/user/updateProfile.usecase';
import { DatabaseCategoryRepository } from '../repositories/category.repository';
import { GetCategoriesUseCases } from '@/usecases/category/getCategories.usecases';
import { GetCategoryUseCases } from '@/usecases/category/getCategory.usecases';
import { addCategoryUseCases } from '@/usecases/category/addCategory.usecases';
import { DeleteCategoryUseCases } from '@/usecases/category/deleteCategory.usecases';
import { UpdateCategoryUseCases } from '@/usecases/category/updateCategory.usecases';
import { AppAutoMapperModule } from '../mapper/automapper.module';
import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { DatabaseProductRepository } from '../repositories/product.repository';
import { GetProductUseCases } from '@/usecases/product/getProduct.usecases';
import { GetProductsUseCases } from '@/usecases/product/getProducts.usecases';
import { AddProductUseCases } from '@/usecases/product/addProduct.usecases';
import { DeleteProductUseCases } from '@/usecases/product/deleteProduct.usecases';
import { UpdateProductUseCases } from '@/usecases/product/updateProduct.usecases';

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule,
    BcryptModule,
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    AppAutoMapperModule,
  ],
})
export class UsecasesProxyModule {
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'isAuthenticatedUsecasesProxy';
  static LOGOUT_USECASES_PROXY = 'logoutUsecasesProxy';
  static REFRESH_TOKEN_USECASES_PROXY = 'refreshTokenUsecasesProxy';

  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
  static GET_USER_PROFILE_USECASES_PROXY = 'getUserProfileUsecasesProxy';
  static PUT_USER_USECASES_PROXY = 'putUserUsecasesProxy';

  static GET_CATEGORY_USECASES_PROXY = 'getCategoryUsecasesProxy';
  static GET_CATEGORIES_USECASES_PROXY = 'getCategoriesUsecasesProxy';
  static POST_CATEGORY_USECASES_PROXY = 'postCategoryUsecasesProxy';
  static DELETE_CATEGORY_USECASES_PROXY = 'deleteCategoryUsecasesProxy';
  static PUT_CATEGORY_USECASES_PROXY = 'putCategoryUsecasesProxy';

  static GET_PRODUCT_USECASES_PROXY = 'getProductUsecasesProxy';
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUsecasesProxy';
  static POST_PRODUCT_USECASES_PROXY = 'postProductUsecasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'deleteProductUsecasesProxy';
  static PUT_PRODUCT_USECASES_PROXY = 'putProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        // User
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new createUserUsecases(logger, userRepository, bcryptService)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_PROFILE_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new getUserProfileUsecases(logger, userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.PUT_USER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new updateProfileUsecases(logger, userRepository)),
        },
        // Category
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new GetCategoryUseCases(categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new GetCategoriesUseCases(categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository, getMapperToken()],
          provide: UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new addCategoryUseCases(logger, categoryRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new DeleteCategoryUseCases(logger, categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new UpdateCategoryUseCases(logger, categoryRepository, mapper)),
        },
        // Product
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new GetProductUseCases(productRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new GetProductsUseCases(productRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseProductRepository,
            DatabaseCategoryRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
            categoryRepository: DatabaseCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddProductUseCases(logger, productRepository, categoryRepository, mapper),
            ),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new DeleteProductUseCases(logger, productRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseProductRepository,
            DatabaseCategoryRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
            categoryRepository: DatabaseCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new UpdateProductUseCases(logger, productRepository, categoryRepository, mapper),
            ),
        },
      ],
      exports: [
        // User
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_PROFILE_USECASES_PROXY,
        UsecasesProxyModule.PUT_USER_USECASES_PROXY,
        // Auth
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        // UsecasesProxyModule.REFRESH_TOKEN_USECASES_PROXY,
        // Category
        UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY,
        UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY,
        // Product
        UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
      ],
    };
  }
}
