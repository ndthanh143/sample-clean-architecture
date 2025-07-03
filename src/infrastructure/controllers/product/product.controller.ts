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
import { ProductPresenter } from './product.presenter';
import { GetProductUseCases } from '@/usecases/product/getProduct.usecases';
import { UpdateProductUseCases } from '@/usecases/product/updateProduct.usecases';
import { GetProductsUseCases } from '@/usecases/product/getProducts.usecases';
import { DeleteProductUseCases } from '@/usecases/product/deleteProduct.usecases';
import { AddProductUseCases } from '@/usecases/product/addProduct.usecases';
import {
  AddProductDto,
  ProductQueryDto,
  ProductSearchQueryDto,
  UpdateProductDto,
} from './product.dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('products')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecases: UseCaseProxy<GetProductUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecases: UseCaseProxy<UpdateProductUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductUseCases: UseCaseProxy<GetProductsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUseCases: UseCaseProxy<DeleteProductUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUseCases: UseCaseProxy<AddProductUseCases>,
  ) {}

  @Get('search')
  @ApiResponseType(ProductPresenter, true, true)
  async searchProducts(@Query() query: ProductSearchQueryDto) {
    const { page, limit, q } = query;
    const categoryId = undefined;

    const results = await this.getAllProductUseCases
      .getInstance()
      .executeForAdmin(page, limit, categoryId, q);
    return {
      data: results.data.map((item) => new ProductPresenter(item)),
      meta: results.meta,
    };
  }

  @Get('relative/:slug')
  @ApiResponseType(ProductPresenter, true, true)
  async getRelativeProducts(@Param('slug') slug: string) {
    const page = 1;
    const limit = 10;

    const results = await this.getAllProductUseCases
      .getInstance()
      .executeGetRelative(page, limit, slug);
    return {
      data: results.data.map((item) => new ProductPresenter(item)),
      meta: results.meta,
    };
  }

  @Get('admin/all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPresenter, true, true)
  async getAllForAdmin(@Query() query: ProductQueryDto) {
    const { page, limit, categoryId, sortBy, minPrice, maxPrice } = query;
    const results = await this.getAllProductUseCases
      .getInstance()
      .executeForAdmin(page, limit, categoryId, '', sortBy, minPrice, maxPrice);
    return {
      data: results.data.map((item) => new ProductPresenter(item)),
      meta: results.meta,
    };
  }

  @Get('admin/:id')
  @ApiResponseType(ProductPresenter, false)
  async getByIdForAdmin(@Param('id') id: number) {
    const product = await this.getProductUsecases.getInstance().executeById(id);
    return new ProductPresenter(product);
  }

  @Get(':slug')
  @ApiResponseType(ProductPresenter, false)
  async getBySlug(@Param('slug') slug: string) {
    const product = await this.getProductUsecases.getInstance().executeBySlug(slug);
    return new ProductPresenter(product);
  }

  @Get('')
  @ApiResponseType(ProductPresenter, true, true)
  async getAll(@Query() query: ProductQueryDto) {
    const { page, limit, categoryId, sortBy, minPrice, maxPrice } = query;
    const results = await this.getAllProductUseCases
      .getInstance()
      .execute(page, limit, categoryId, '', sortBy, minPrice, maxPrice);
    return {
      data: results.data.map((item) => new ProductPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPresenter, true)
  async add(@Body() dto: AddProductDto) {
    const productCreated = await this.addProductUseCases.getInstance().execute(dto);
    return new ProductPresenter(productCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    await this.updateProductUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteProductUseCases.getInstance().execute(id);
    return 'success';
  }
}
