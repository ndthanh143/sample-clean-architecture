import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { Category } from '../entities/category.entity';
import { DatabaseCategoryRepository } from './category.repository';
import { DatabaseProductRepository } from './product.repository';
import { Product } from '../entities/product.entity';
import { DatabaseBlogRepository } from './blog.repository';
import { DatabaseBlogCategoryRepository } from './blogCategory.repository';
import { Blog } from '../entities/blog.entity';
import { BlogCategory } from '../entities/blog-category.entity';
import { DatabaseFileRepository } from './file.repository';
import { File } from '../entities/file.entity';
import { DatabaseOrderRepository } from './order.repository';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ProductPlan } from '../entities/product-plan.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { Discount } from '../entities/discount.entity';
import { DatabaseProductPlanRepository } from './productPlan.repository';
import { DatabaseProductVariantRepository } from './productVariant.repository';
import { DatabaseDiscountRepository } from './discount.repository';
import { ProductDetail } from '../entities/product-detail.entity';
import { DatabaseProductDetailRepository } from './productDetail.repository';
import { UserProductDetail } from '../entities/user-product-detail.entity';
import { DatabaseUserProductDetailRepository } from './userProductDetail.repository';
import { DatabasePaymentRepository } from './payment.repository';
import { Payment } from '../entities/payment.entity';
import { MailerModule } from '../services/mailer/mailer.module';
import { Review } from '../entities/review.entity';
import { DatabaseReviewRepository } from './review.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      Category,
      Product,
      Blog,
      BlogCategory,
      File,
      Order,
      OrderItem,
      ProductPlan,
      ProductVariant,
      Discount,
      ProductDetail,
      UserProductDetail,
      Payment,
      Review,
    ]),
    MailerModule,
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseCategoryRepository,
    DatabaseProductRepository,
    DatabaseBlogRepository,
    DatabaseBlogCategoryRepository,
    DatabaseFileRepository,
    DatabaseOrderRepository,
    DatabaseProductPlanRepository,
    DatabaseProductVariantRepository,
    DatabaseDiscountRepository,
    DatabaseProductDetailRepository,
    DatabaseUserProductDetailRepository,
    DatabasePaymentRepository,
    DatabaseReviewRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseCategoryRepository,
    DatabaseProductRepository,
    DatabaseBlogRepository,
    DatabaseBlogCategoryRepository,
    DatabaseFileRepository,
    DatabaseOrderRepository,
    DatabaseProductPlanRepository,
    DatabaseProductVariantRepository,
    DatabaseDiscountRepository,
    DatabaseProductDetailRepository,
    DatabaseUserProductDetailRepository,
    DatabasePaymentRepository,
    DatabaseReviewRepository,
  ],
})
export class RepositoriesModule {}
