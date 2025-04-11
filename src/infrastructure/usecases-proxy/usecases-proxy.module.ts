import { DynamicModule, Module } from '@nestjs/common';
import { addTodoUseCases } from '../../usecases/todo/addTodo.usecases';
import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';
import { GetTodoUseCases } from '../../usecases/todo/getTodo.usecases';
import { getTodosUseCases } from '../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { createUserUsecases } from 'src/usecases/user/createUser.usecase';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { JwtModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { getUserProfileUsecases } from 'src/usecases/user/getProfile.usecase';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { updateProfileUsecases } from 'src/usecases/user/updateProfile.usecase';

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule,
    BcryptModule,
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'isAuthenticatedUsecasesProxy';
  static LOGOUT_USECASES_PROXY = 'logoutUsecasesProxy';
  static REFRESH_TOKEN_USECASES_PROXY = 'refreshTokenUsecasesProxy';

  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';

  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
  static GET_USER_PROFILE_USECASES_PROXY = 'getUserProfileUsecasesProxy';
  static PUT_USER_USECASES_PROXY = 'putUserUsecasesProxy';

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
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
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
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        // User
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_PROFILE_USECASES_PROXY,
        UsecasesProxyModule.PUT_USER_USECASES_PROXY,
        // Auth
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        // UsecasesProxyModule.REFRESH_TOKEN_USECASES_PROXY,
      ],
    };
  }
}
