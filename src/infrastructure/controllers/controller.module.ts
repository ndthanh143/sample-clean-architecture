import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController, CategoryController, ProductController],
})
export class ControllersModule {}
