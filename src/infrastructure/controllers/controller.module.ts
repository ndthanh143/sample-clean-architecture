import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { TodoController } from './todo/todo.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController, UserController, AuthController],
})
export class ControllersModule {}
