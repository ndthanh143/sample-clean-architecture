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
import { UploadFileUseCases } from '@/usecases/file/upload-file.usecase';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { DatabaseBlogRepository } from '../repositories/blog.repository';
import { DatabaseBlogCategoryRepository } from '../repositories/blogCategory.repository';
import { GetBlogUseCases } from '@/usecases/blog/getBlog.usecases';
import { GetBlogsUseCases } from '@/usecases/blog/getBlogs.usecases';
import { AddBlogUseCases } from '@/usecases/blog/addBlog.usecases';
import { DeleteBlogUseCases } from '@/usecases/blog/deleteBlog.usecases';
import { UpdateBlogUseCases } from '@/usecases/blog/updateBlog.usecases';
import { GetBlogCategoryUseCases } from '@/usecases/blog-category/getBlogCategory.usecases';
import { GetBlogCategoriesUseCases } from '@/usecases/blog-category/getBlogCategories.usecases';
import { AddBlogCategoryUseCases } from '@/usecases/blog-category/addBlogCategory.usecases';
import { DeleteBlogCategoryUseCases } from '@/usecases/blog-category/deleteBlogCategory.usecases';
import { UpdateBlogCategoryUseCases } from '@/usecases/blog-category/updateBlogCategory.usecases';
import { DatabaseFileRepository } from '../repositories/file.repository';
import { GetFilesUseCases } from '@/usecases/file/getFiles.usecase';
import { DeleteFileUseCases } from '@/usecases/file/deleteFile.usecase';
import { CreateStripePaymentIntentUseCases } from '@/usecases/payment/createPaymentIntent.usecases';
import { StripeService } from '../services/stripe/stripe.service';
import { StripeModule } from '../services/stripe/stripe.module';
import { DatabaseOrderRepository } from '../repositories/order.repository';
import { GetOrderUseCases } from '@/usecases/order/getOrder.usecases';
import { GetOrdersUseCases } from '@/usecases/order/getOrders.usecases';
import { AddOrderUseCases } from '@/usecases/order/addOrder.usecases';
import { UpdateOrderUseCases } from '@/usecases/order/updateOrder.usecases';
import { DatabaseProductPlanRepository } from '../repositories/productPlan.repository';
import { DatabaseProductVariantRepository } from '../repositories/productVariant.repository';
import { DatabaseDiscountRepository } from '../repositories/discount.repository';
import { GetProductPlanUseCases } from '@/usecases/product-plan/getProductPlan.usecases';
import { GetProductPlansUseCases } from '@/usecases/product-plan/getProductPlans.usecases';
import { AddProductPlanUseCases } from '@/usecases/product-plan/addProductPlan.usecases';
import { DeleteProductPlanUseCases } from '@/usecases/product-plan/deleteProductPlan.usecases';
import { UpdateProductPlanUseCases } from '@/usecases/product-plan/updateProductPlan.usecases';
import { GetProductVariantUseCases } from '@/usecases/product-variant/getProductVariant.usecases';
import { GetProductVariantsUseCases } from '@/usecases/product-variant/getProductVariants.usecases';
import { AddProductVariantUseCases } from '@/usecases/product-variant/addProductVariant.usecases';
import { DeleteProductVariantUseCases } from '@/usecases/product-variant/deleteProductVariant.usecases';
import { UpdateProductVariantUseCases } from '@/usecases/product-variant/updateProductVariant.usecases';
import { GetDiscountUseCases } from '@/usecases/discount/getDiscount.usecases';
import { GetDiscountsUseCases } from '@/usecases/discount/getDiscounts.usecases';
import { AddDiscountUseCases } from '@/usecases/discount/addDiscount.usecases';
import { DeleteDiscountUseCases } from '@/usecases/discount/deleteDiscount.usecases';
import { UpdateDiscountUseCases } from '@/usecases/discount/updateDiscount.usecases';
import { AddProductDetailUseCases } from '@/usecases/product-detail/addProductDetail.usecases';
import { UpdateProductDetailUseCases } from '@/usecases/product-detail/updateProductDetail.usecases';
import { DeleteProductDetailUseCases } from '@/usecases/product-detail/deleteProductDetail.usecases';
import { GetProductDetailUseCases } from '@/usecases/product-detail/getProductDetail.usecases';
import { GetProductDetailsUseCases } from '@/usecases/product-detail/getProductDetails.usecases';
import { DatabaseProductDetailRepository } from '../repositories/productDetail.repository';
import { GetUserProductDetailUseCases } from '@/usecases/user-product-detail/getUserProductDetail.usecases';
import { GetUserProductDetailsUseCases } from '@/usecases/user-product-detail/getUserProductDetails.usecases';
import { AddUserProductDetailUseCases } from '@/usecases/user-product-detail/addUserProductDetail.usecases';
import { UpdateUserProductDetailUseCases } from '@/usecases/user-product-detail/updateUserProductDetail.usecases';
import { DeleteUserProductDetailUseCases } from '@/usecases/user-product-detail/deleteUserProductDetail.usecases';
import { DatabaseUserProductDetailRepository } from '../repositories/userProductDetail.repository';
import { DatabasePaymentRepository } from '../repositories/payment.repository';
import { UpdatePaymentUseCases } from '@/usecases/payment/updatePaymentUsecases';
import { MailerModule } from '../services/mailer/mailer.module';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { eventHandlers } from '../event/handlers';
import { subscribers } from '../event/subcribers';
import { DatabaseReviewRepository } from '../repositories/review.repository';
import { GetReviewUseCases } from '@/usecases/review/getReview.usecases';
import { GetReviewsUseCases } from '@/usecases/review/getReviews.usecases';
import { AddReviewUseCases } from '@/usecases/review/addReview.usecases';
import { DeleteReviewUseCases } from '@/usecases/review/deleteReview.usecases';
import { UpdateReviewUseCases } from '@/usecases/review/updateOrder.usecases';
import { GetStatisticReviewProductUsecases } from '@/usecases/review/getStatisticReviewProduct.usecases';
import { GoogleAuthService } from '../services/googleAuth/googleAuth.service';
import { GoogleAuthModule } from '../services/googleAuth/googleAuth.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule,
    GoogleAuthModule,
    BcryptModule,
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    AppAutoMapperModule,
    CloudinaryModule,
    StripeModule,
    MailerModule,
    CqrsModule,
  ],
  providers: [...eventHandlers, ...subscribers],
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

  static UPLOAD_FILE_USECASES_PROXY = 'uploadFileUsecasesProxy';
  static GET_FILES_USECASES_PROXY = 'getFilesUsecasesProxy';
  static DELETE_FILE_USECASES_PROXY = 'deleteFileUsecasesProxy';

  static GET_BLOG_USECASES_PROXY = 'getBlogUsecasesProxy';
  static GET_BLOGS_USECASES_PROXY = 'getBlogsUsecasesProxy';
  static POST_BLOG_USECASES_PROXY = 'postBlogUsecasesProxy';
  static DELETE_BLOG_USECASES_PROXY = 'deleteBlogUsecasesProxy';
  static PUT_BLOG_USECASES_PROXY = 'putBlogUsecasesProxy';

  static GET_BLOG_CATEGORY_USECASES_PROXY = 'getBlogCategoryUsecasesProxy';
  static GET_BLOG_CATEGORIES_USECASES_PROXY = 'getBlogCategoriesUsecasesProxy';
  static POST_BLOG_CATEGORY_USECASES_PROXY = 'postBlogCategoryUsecasesProxy';
  static DELETE_BLOG_CATEGORY_USECASES_PROXY = 'deleteBlogCategoryUsecasesProxy';
  static PUT_BLOG_CATEGORY_USECASES_PROXY = 'putBlogCategoryUsecasesProxy';

  static POST_PAYMENT_INTENT_USECASES_PROXY = 'postPaymentIntentUsecasesProxy';
  static PUT_PAYMENT_USECASES_PROXY = 'putPaymentUsecasesProxy';

  // Order
  static GET_ORDER_USECASES_PROXY = 'getOrderUsecasesProxy';
  static GET_ORDERS_USECASES_PROXY = 'getOrdersUsecasesProxy';
  static POST_ORDER_USECASES_PROXY = 'postOrderUsecasesProxy';
  static PUT_ORDER_USECASES_PROXY = 'putOrderUsecasesProxy';

  // Product Plan
  static GET_PRODUCT_PLAN_USECASES_PROXY = 'getProductPlanUsecasesProxy';
  static GET_PRODUCT_PLANS_USECASES_PROXY = 'getProductPlansUsecasesProxy';
  static POST_PRODUCT_PLAN_USECASES_PROXY = 'postProductPlanUsecasesProxy';
  static DELETE_PRODUCT_PLAN_USECASES_PROXY = 'deleteProductPlanUsecasesProxy';
  static PUT_PRODUCT_PLAN_USECASES_PROXY = 'putProductPlanUsecasesProxy';

  // Product Variant
  static GET_PRODUCT_VARIANT_USECASES_PROXY = 'getProductVariantUsecasesProxy';
  static GET_PRODUCT_VARIANTS_USECASES_PROXY = 'getProductVariantsUsecasesProxy';
  static POST_PRODUCT_VARIANT_USECASES_PROXY = 'postProductVariantUsecasesProxy';
  static DELETE_PRODUCT_VARIANT_USECASES_PROXY = 'deleteProductVariantUsecasesProxy';
  static PUT_PRODUCT_VARIANT_USECASES_PROXY = 'putProductVariantUsecasesProxy';

  // Discount
  static GET_DISCOUNT_USECASES_PROXY = 'getDiscountUsecasesProxy';
  static GET_DISCOUNTS_USECASES_PROXY = 'getDiscountsUsecasesProxy';
  static POST_DISCOUNT_USECASES_PROXY = 'postDiscountUsecasesProxy';
  static DELETE_DISCOUNT_USECASES_PROXY = 'deleteDiscountUsecasesProxy';
  static PUT_DISCOUNT_USECASES_PROXY = 'putDiscountUsecasesProxy';

  // Product Detail
  static GET_PRODUCT_DETAIL_USECASES_PROXY = 'getProductDetailUsecasesProxy';
  static GET_PRODUCT_DETAILS_USECASES_PROXY = 'getProductDetailsUsecasesProxy';
  static POST_PRODUCT_DETAIL_USECASES_PROXY = 'postProductDetailUsecasesProxy';
  static DELETE_PRODUCT_DETAIL_USECASES_PROXY = 'deleteProductDetailUsecasesProxy';
  static PUT_PRODUCT_DETAIL_USECASES_PROXY = 'putProductDetailUsecasesProxy';

  // User Product Detail
  static GET_USER_PRODUCT_DETAIL_USECASES_PROXY = 'getUserProductDetailUsecasesProxy';
  static GET_USER_PRODUCT_DETAILS_USECASES_PROXY = 'getUserProductDetailsUsecasesProxy';
  static POST_USER_PRODUCT_DETAIL_USECASES_PROXY = 'postUserProductDetailUsecasesProxy';
  static DELETE_USER_PRODUCT_DETAIL_USECASES_PROXY = 'deleteUserProductDetailUsecasesProxy';
  static PUT_USER_PRODUCT_DETAIL_USECASES_PROXY = 'putUserProductDetailUsecasesProxy';

  // Review
  static GET_REVIEW_USECASES_PROXY = 'getReviewUsecasesProxy';
  static GET_REVIEWS_USECASES_PROXY = 'getReviewsUsecasesProxy';
  static POST_REVIEW_USECASES_PROXY = 'postReviewUsecasesProxy';
  static DELETE_REVIEW_USECASES_PROXY = 'deleteReviewUsecasesProxy';
  static PUT_REVIEW_USECASES_PROXY = 'putReviewUsecasesProxy';
  static GET_STATISTICS_REVIEW_PRODUCT_USECASES_PROXY = 'getStatisticsReviewProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      imports: [CqrsModule],
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
            GoogleAuthService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            googleAuthService: GoogleAuthService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
                googleAuthService,
              ),
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
        // File
        {
          inject: [LoggerService, CloudinaryService, DatabaseFileRepository],
          provide: UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            uploadFileService: CloudinaryService,
            fileRepository: DatabaseFileRepository,
          ) => new UseCaseProxy(new UploadFileUseCases(logger, uploadFileService, fileRepository)),
        },
        {
          inject: [LoggerService, DatabaseFileRepository],
          provide: UsecasesProxyModule.GET_FILES_USECASES_PROXY,
          useFactory: (logger: LoggerService, fileRepository: DatabaseFileRepository) =>
            new UseCaseProxy(new GetFilesUseCases(logger, fileRepository)),
        },
        {
          inject: [LoggerService, DatabaseFileRepository, CloudinaryService],
          provide: UsecasesProxyModule.DELETE_FILE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            fileRepository: DatabaseFileRepository,
            fileService: CloudinaryService,
          ) => new UseCaseProxy(new DeleteFileUseCases(logger, fileRepository, fileService)),
        },
        // Blog
        {
          inject: [LoggerService, DatabaseBlogRepository],
          provide: UsecasesProxyModule.GET_BLOG_USECASES_PROXY,
          useFactory: (logger: LoggerService, blogRepository: DatabaseBlogRepository) =>
            new UseCaseProxy(new GetBlogUseCases(blogRepository)),
        },
        {
          inject: [LoggerService, DatabaseBlogRepository],
          provide: UsecasesProxyModule.GET_BLOGS_USECASES_PROXY,
          useFactory: (logger: LoggerService, blogRepository: DatabaseBlogRepository) =>
            new UseCaseProxy(new GetBlogsUseCases(blogRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseBlogRepository,
            DatabaseBlogCategoryRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.POST_BLOG_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogRepository: DatabaseBlogRepository,
            categoryRepository: DatabaseBlogCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddBlogUseCases(logger, blogRepository, categoryRepository, mapper),
            ),
        },
        {
          inject: [LoggerService, DatabaseBlogRepository],
          provide: UsecasesProxyModule.DELETE_BLOG_USECASES_PROXY,
          useFactory: (logger: LoggerService, blogRepository: DatabaseBlogRepository) =>
            new UseCaseProxy(new DeleteBlogUseCases(logger, blogRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseBlogRepository,
            DatabaseBlogCategoryRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.PUT_BLOG_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogRepository: DatabaseBlogRepository,
            categoryRepository: DatabaseBlogCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new UpdateBlogUseCases(logger, blogRepository, categoryRepository, mapper),
            ),
        },
        // Blog category
        {
          inject: [LoggerService, DatabaseBlogCategoryRepository],
          provide: UsecasesProxyModule.GET_BLOG_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogCategoryRepository: DatabaseBlogCategoryRepository,
          ) => new UseCaseProxy(new GetBlogCategoryUseCases(blogCategoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseBlogCategoryRepository],
          provide: UsecasesProxyModule.GET_BLOG_CATEGORIES_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogCategoryRepository: DatabaseBlogCategoryRepository,
          ) => new UseCaseProxy(new GetBlogCategoriesUseCases(blogCategoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseBlogCategoryRepository, getMapperToken()],
          provide: UsecasesProxyModule.POST_BLOG_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogCategoryRepository: DatabaseBlogCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(new AddBlogCategoryUseCases(logger, blogCategoryRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseBlogCategoryRepository],
          provide: UsecasesProxyModule.DELETE_BLOG_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogCategoryRepository: DatabaseBlogCategoryRepository,
          ) => new UseCaseProxy(new DeleteBlogCategoryUseCases(logger, blogCategoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseBlogCategoryRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_BLOG_CATEGORY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            blogCategoryRepository: DatabaseBlogCategoryRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new UpdateBlogCategoryUseCases(logger, blogCategoryRepository, mapper),
            ),
        },
        // Payment
        {
          inject: [StripeService],
          provide: UsecasesProxyModule.POST_PAYMENT_INTENT_USECASES_PROXY,
          useFactory: (stripeService: StripeService) =>
            new UseCaseProxy(new CreateStripePaymentIntentUseCases(stripeService)),
        },
        {
          inject: [LoggerService, DatabasePaymentRepository],
          provide: UsecasesProxyModule.PUT_PAYMENT_USECASES_PROXY,
          useFactory: (logger: LoggerService, paymentRepository: DatabasePaymentRepository) =>
            new UseCaseProxy(new UpdatePaymentUseCases(logger, paymentRepository)),
        },
        // Order
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
          useFactory: (logger: LoggerService, oderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new GetOrderUseCases(logger, oderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository, getMapperToken()],
          provide: UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new GetOrdersUseCases(logger, orderRepository, mapper)),
        },
        {
          inject: [
            LoggerService,
            DatabaseOrderRepository,
            DatabaseProductRepository,
            DatabasePaymentRepository,
            getMapperToken(),
            EventBus,
          ],
          provide: UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
            productRepository: DatabaseProductRepository,
            paymentRepository: DatabasePaymentRepository,
            mapper: Mapper,
            eventBus: EventBus,
          ) =>
            new UseCaseProxy(
              new AddOrderUseCases(
                logger,
                orderRepository,
                productRepository,
                paymentRepository,
                mapper,
                eventBus,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: DatabaseOrderRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new UpdateOrderUseCases(logger, orderRepository, mapper)),
        },
        // Product Plan
        {
          inject: [DatabaseProductPlanRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_PLAN_USECASES_PROXY,
          useFactory: (productPlanRepository: DatabaseProductPlanRepository) =>
            new UseCaseProxy(new GetProductPlanUseCases(productPlanRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductPlanRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_PLANS_USECASES_PROXY,
          useFactory: (productPlanRepository: DatabaseProductPlanRepository) =>
            new UseCaseProxy(new GetProductPlansUseCases(productPlanRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductPlanRepository, getMapperToken()],
          provide: UsecasesProxyModule.POST_PRODUCT_PLAN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productPlanRepository: DatabaseProductPlanRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new AddProductPlanUseCases(logger, productPlanRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseProductPlanRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_PLAN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productPlanRepository: DatabaseProductPlanRepository,
          ) => new UseCaseProxy(new DeleteProductPlanUseCases(logger, productPlanRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductPlanRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_PRODUCT_PLAN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productPlanRepository: DatabaseProductPlanRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(new UpdateProductPlanUseCases(logger, productPlanRepository, mapper)),
        },
        // Product Variant
        {
          inject: [DatabaseProductVariantRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_VARIANT_USECASES_PROXY,
          useFactory: (productVariantRepository: DatabaseProductVariantRepository) =>
            new UseCaseProxy(new GetProductVariantUseCases(productVariantRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductVariantRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_VARIANTS_USECASES_PROXY,
          useFactory: (productVariantRepository: DatabaseProductVariantRepository) =>
            new UseCaseProxy(new GetProductVariantsUseCases(productVariantRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductVariantRepository, getMapperToken()],
          provide: UsecasesProxyModule.POST_PRODUCT_VARIANT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productVariantRepository: DatabaseProductVariantRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddProductVariantUseCases(logger, productVariantRepository, mapper),
            ),
        },
        {
          inject: [LoggerService, DatabaseProductVariantRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_VARIANT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productVariantRepository: DatabaseProductVariantRepository,
          ) => new UseCaseProxy(new DeleteProductVariantUseCases(logger, productVariantRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductVariantRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_PRODUCT_VARIANT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productVariantRepository: DatabaseProductVariantRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new UpdateProductVariantUseCases(logger, productVariantRepository, mapper),
            ),
        },
        // Discount
        {
          inject: [DatabaseDiscountRepository],
          provide: UsecasesProxyModule.GET_DISCOUNT_USECASES_PROXY,
          useFactory: (discountRepository: DatabaseDiscountRepository) =>
            new UseCaseProxy(new GetDiscountUseCases(discountRepository)),
        },
        {
          inject: [LoggerService, DatabaseDiscountRepository],
          provide: UsecasesProxyModule.GET_DISCOUNTS_USECASES_PROXY,
          useFactory: (discountRepository: DatabaseDiscountRepository) =>
            new UseCaseProxy(new GetDiscountsUseCases(discountRepository)),
        },
        {
          inject: [LoggerService, DatabaseDiscountRepository, getMapperToken()],
          provide: UsecasesProxyModule.POST_DISCOUNT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            discountRepository: DatabaseDiscountRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new AddDiscountUseCases(logger, discountRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseDiscountRepository],
          provide: UsecasesProxyModule.DELETE_DISCOUNT_USECASES_PROXY,
          useFactory: (logger: LoggerService, discountRepository: DatabaseDiscountRepository) =>
            new UseCaseProxy(new DeleteDiscountUseCases(logger, discountRepository)),
        },
        {
          inject: [LoggerService, DatabaseDiscountRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_DISCOUNT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            discountRepository: DatabaseDiscountRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new UpdateDiscountUseCases(logger, discountRepository, mapper)),
        },
        // Product Detail
        {
          inject: [LoggerService, DatabaseProductDetailRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productDetailRepository: DatabaseProductDetailRepository,
          ) => new UseCaseProxy(new GetProductDetailUseCases(productDetailRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductDetailRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_DETAILS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productDetailRepository: DatabaseProductDetailRepository,
          ) => new UseCaseProxy(new GetProductDetailsUseCases(productDetailRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseProductDetailRepository,
            DatabaseProductRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.POST_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productDetailRepository: DatabaseProductDetailRepository,
            productRepository: DatabaseProductRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddProductDetailUseCases(
                logger,
                productDetailRepository,
                productRepository,
                mapper,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseProductDetailRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productDetailRepository: DatabaseProductDetailRepository,
          ) => new UseCaseProxy(new DeleteProductDetailUseCases(logger, productDetailRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseProductDetailRepository,
            DatabaseProductRepository,
            getMapperToken(),
            CommandBus,
          ],
          provide: UsecasesProxyModule.PUT_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productDetailRepository: DatabaseProductDetailRepository,
            productRepository: DatabaseProductRepository,
            mapper: Mapper,
            commandBus: CommandBus,
          ) =>
            new UseCaseProxy(
              new UpdateProductDetailUseCases(
                logger,
                productDetailRepository,
                productRepository,
                mapper,
                commandBus,
              ),
            ),
        },
        // User Product Detail
        {
          inject: [LoggerService, DatabaseUserProductDetailRepository],
          provide: UsecasesProxyModule.GET_USER_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userProductDetailRepository: DatabaseUserProductDetailRepository,
          ) => new UseCaseProxy(new GetUserProductDetailUseCases(userProductDetailRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserProductDetailRepository],
          provide: UsecasesProxyModule.GET_USER_PRODUCT_DETAILS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userProductDetailRepository: DatabaseUserProductDetailRepository,
          ) => new UseCaseProxy(new GetUserProductDetailsUseCases(userProductDetailRepository)),
        },
        {
          inject: [
            LoggerService,
            DatabaseUserProductDetailRepository,
            DatabaseProductDetailRepository,
            DatabaseUserRepository,
            DatabaseOrderRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.POST_USER_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userProductDetailRepository: DatabaseUserProductDetailRepository,
            productDetailRepository: DatabaseProductDetailRepository,
            userRepository: DatabaseUserRepository,
            orderRepository: DatabaseOrderRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddUserProductDetailUseCases(
                logger,
                userProductDetailRepository,
                productDetailRepository,
                userRepository,
                orderRepository,
                mapper,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserProductDetailRepository],
          provide: UsecasesProxyModule.DELETE_USER_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userProductDetailRepository: DatabaseUserProductDetailRepository,
          ) =>
            new UseCaseProxy(
              new DeleteUserProductDetailUseCases(logger, userProductDetailRepository),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabaseUserProductDetailRepository,
            DatabaseProductDetailRepository,
            DatabaseUserRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.PUT_USER_PRODUCT_DETAIL_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userProductDetailRepository: DatabaseUserProductDetailRepository,
            productDetailRepository: DatabaseProductDetailRepository,
            userRepository: DatabaseUserRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new UpdateUserProductDetailUseCases(
                logger,
                userProductDetailRepository,
                productDetailRepository,
                userRepository,
                mapper,
              ),
            ),
        },
        // Review
        {
          inject: [LoggerService, DatabaseReviewRepository],
          provide: UsecasesProxyModule.GET_REVIEW_USECASES_PROXY,
          useFactory: (logger: LoggerService, reviewRepository: DatabaseReviewRepository) =>
            new UseCaseProxy(new GetReviewUseCases(logger, reviewRepository)),
        },
        {
          inject: [LoggerService, DatabaseReviewRepository, getMapperToken()],
          provide: UsecasesProxyModule.GET_REVIEWS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            reviewRepository: DatabaseReviewRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new GetReviewsUseCases(logger, reviewRepository, mapper)),
        },
        {
          inject: [
            LoggerService,
            DatabaseReviewRepository,
            DatabaseProductRepository,
            DatabaseUserRepository,
            getMapperToken(),
          ],
          provide: UsecasesProxyModule.POST_REVIEW_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            reviewRepository: DatabaseReviewRepository,
            productRepository: DatabaseProductRepository,
            userRepository: DatabaseUserRepository,
            mapper: Mapper,
          ) =>
            new UseCaseProxy(
              new AddReviewUseCases(
                logger,
                reviewRepository,
                productRepository,
                userRepository,
                mapper,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseReviewRepository, getMapperToken()],
          provide: UsecasesProxyModule.DELETE_REVIEW_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            reviewRepository: DatabaseReviewRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new DeleteReviewUseCases(logger, reviewRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseReviewRepository, getMapperToken()],
          provide: UsecasesProxyModule.PUT_REVIEW_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            reviewRepository: DatabaseReviewRepository,
            mapper: Mapper,
          ) => new UseCaseProxy(new UpdateReviewUseCases(logger, reviewRepository, mapper)),
        },
        {
          inject: [LoggerService, DatabaseReviewRepository],
          provide: UsecasesProxyModule.GET_STATISTICS_REVIEW_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, reviewRepository: DatabaseReviewRepository) =>
            new UseCaseProxy(new GetStatisticReviewProductUsecases(logger, reviewRepository)),
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
        // File
        UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY,
        UsecasesProxyModule.GET_FILES_USECASES_PROXY,
        UsecasesProxyModule.DELETE_FILE_USECASES_PROXY,
        // Blog
        UsecasesProxyModule.GET_BLOG_USECASES_PROXY,
        UsecasesProxyModule.GET_BLOGS_USECASES_PROXY,
        UsecasesProxyModule.POST_BLOG_USECASES_PROXY,
        UsecasesProxyModule.DELETE_BLOG_USECASES_PROXY,
        UsecasesProxyModule.PUT_BLOG_USECASES_PROXY,
        // Blog category
        UsecasesProxyModule.GET_BLOG_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.GET_BLOG_CATEGORIES_USECASES_PROXY,
        UsecasesProxyModule.POST_BLOG_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.DELETE_BLOG_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.PUT_BLOG_CATEGORY_USECASES_PROXY,
        // Payment
        UsecasesProxyModule.POST_PAYMENT_INTENT_USECASES_PROXY,
        UsecasesProxyModule.PUT_PAYMENT_USECASES_PROXY,
        // Order
        UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
        UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
        UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
        UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
        // Product Plan
        UsecasesProxyModule.GET_PRODUCT_PLAN_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCT_PLANS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_PLAN_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_PLAN_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_PLAN_USECASES_PROXY,
        // Product Variant
        UsecasesProxyModule.GET_PRODUCT_VARIANT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCT_VARIANTS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_VARIANT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_VARIANT_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_VARIANT_USECASES_PROXY,
        // Discount
        UsecasesProxyModule.GET_DISCOUNT_USECASES_PROXY,
        UsecasesProxyModule.GET_DISCOUNTS_USECASES_PROXY,
        UsecasesProxyModule.POST_DISCOUNT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_DISCOUNT_USECASES_PROXY,
        UsecasesProxyModule.PUT_DISCOUNT_USECASES_PROXY,
        // Product Detail
        UsecasesProxyModule.GET_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCT_DETAILS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_DETAIL_USECASES_PROXY,
        // User Product Detail
        UsecasesProxyModule.GET_USER_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_PRODUCT_DETAILS_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.DELETE_USER_PRODUCT_DETAIL_USECASES_PROXY,
        UsecasesProxyModule.PUT_USER_PRODUCT_DETAIL_USECASES_PROXY,
        // Review
        UsecasesProxyModule.GET_REVIEW_USECASES_PROXY,
        UsecasesProxyModule.GET_REVIEWS_USECASES_PROXY,
        UsecasesProxyModule.POST_REVIEW_USECASES_PROXY,
        UsecasesProxyModule.DELETE_REVIEW_USECASES_PROXY,
        UsecasesProxyModule.PUT_REVIEW_USECASES_PROXY,
        UsecasesProxyModule.GET_STATISTICS_REVIEW_PRODUCT_USECASES_PROXY,
      ],
    };
  }
}
