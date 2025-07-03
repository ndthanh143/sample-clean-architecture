import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { ProductDetailPresenter } from './product-detail.presenter';
import { GetProductDetailUseCases } from '@/usecases/product-detail/getProductDetail.usecases';
import { UpdateProductDetailUseCases } from '@/usecases/product-detail/updateProductDetail.usecases';
import { GetProductDetailsUseCases } from '@/usecases/product-detail/getProductDetails.usecases';
import { DeleteProductDetailUseCases } from '@/usecases/product-detail/deleteProductDetail.usecases';
import { AddProductDetailUseCases } from '@/usecases/product-detail/addProductDetail.usecases';
import {
  AddProductDetailDto,
  ProductDetailQueryDto,
  UpdateProductDetailDto,
} from './product-detail.dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { Role } from '@/utils';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('product-details')
@ApiTags('product-detail')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductDetailPresenter)
export class ProductDetailController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly getProductDetailUsecases: UseCaseProxy<GetProductDetailUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly updateProductDetailUsecases: UseCaseProxy<UpdateProductDetailUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCT_DETAILS_USECASES_PROXY)
    private readonly getAllProductDetailUseCases: UseCaseProxy<GetProductDetailsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly deleteProductDetailUseCases: UseCaseProxy<DeleteProductDetailUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly addProductDetailUseCases: UseCaseProxy<AddProductDetailUseCases>,
  ) {}

  @Get('grant-lists')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, true, true)
  async getAllGrantingAccount(
    @Query() query: ProductDetailQueryDto,
    @Query('userId') userId: number,
  ) {
    const { page, limit, productId, variantId, q } = query;
    const results = await this.getAllProductDetailUseCases
      .getInstance()
      .executeGetForGranting(page, limit, productId, variantId, q, userId);
    return {
      data: results.data.map((item) => new ProductDetailPresenter(item)),
      meta: results.meta,
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, false)
  async getBySlug(@Param('id') id: number) {
    const product = await this.getProductDetailUsecases.getInstance().execute(id);
    return new ProductDetailPresenter(product);
  }

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, true, true)
  async getAll(@Query() query: ProductDetailQueryDto) {
    const { page, limit, productId, q } = query;
    const results = await this.getAllProductDetailUseCases
      .getInstance()
      .execute(page, limit, productId, q);
    return {
      data: results.data.map((item) => new ProductDetailPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, true)
  async add(@Body() dto: AddProductDetailDto) {
    const productCreated = await this.addProductDetailUseCases.getInstance().execute(dto);
    return new ProductDetailPresenter(productCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateProductDetailDto) {
    await this.updateProductDetailUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductDetailPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteProductDetailUseCases.getInstance().execute(id);
    return 'success';
  }
}
