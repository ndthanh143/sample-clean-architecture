import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CategoryProfile } from './category.mapper';
import { ProductProfile } from './product.mapper';
import { BlogProfile } from './blog.mapper';
import { BlogCategoryProfile } from './blog-category.mapper';
import { FileProfile } from './file.mapper';
import { UserProfile } from './user.mapper';
import { OrderProfile } from './order.mapper';
import { OrderItemProfile } from './order-item.mapper';
import { ProductPlanProfile } from './product-plan.mapper';
import { ProductVariantProfile } from './product-variant.mapper';
import { DiscountProfile } from './discount.mapper';
import { ProductDetailProfile } from './product-detail.mapper';
import { UserProductDetailProfile } from './user-product-detail.mapper';
import { PaymentProfile } from './payment.mapper';
import { ReviewProfile } from './review.mapper';

@Module({
  imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
  exports: [
    AutomapperModule,
    UserProfile,
    CategoryProfile,
    ProductProfile,
    BlogProfile,
    BlogCategoryProfile,
    FileProfile,
    OrderProfile,
    OrderItemProfile,
    ProductPlanProfile,
    ProductVariantProfile,
    DiscountProfile,
    ProductDetailProfile,
    UserProductDetailProfile,
    PaymentProfile,
    ReviewProfile,
  ],
  providers: [
    CategoryProfile,
    UserProfile,
    ProductProfile,
    BlogProfile,
    BlogCategoryProfile,
    FileProfile,
    OrderProfile,
    OrderItemProfile,
    ProductPlanProfile,
    ProductVariantProfile,
    DiscountProfile,
    ProductDetailProfile,
    UserProductDetailProfile,
    PaymentProfile,
    ReviewProfile,
  ],
})
export class AppAutoMapperModule {}
