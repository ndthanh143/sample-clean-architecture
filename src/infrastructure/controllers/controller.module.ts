import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';
import { FileController } from './file/file.controller';
import { BlogController } from './blog/blog.controller';
import { BlogCategoryController } from './blog-category/blog-category.controller';
import { PaymentController } from './payment/payment.controller';
import { OrderController } from './order/order.controller';
import { ProductPlanController } from './product-plan/product-plan.controller';
import { ProductVariantController } from './product-variant/product-variant.controller';
import { DiscountController } from './discount/discount.controller';
import { ProductDetailController } from './product-detail/product-detail.controller';
import { UserProductDetailController } from './user-product-detail/user-product-detail.controller';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    UserController,
    AuthController,
    CategoryController,
    ProductController,
    FileController,
    BlogController,
    BlogCategoryController,
    PaymentController,
    OrderController,
    ProductPlanController,
    ProductVariantController,
    DiscountController,
    ProductDetailController,
    UserProductDetailController,
    ReviewController,
  ],
})
export class ControllersModule {}
