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
import { AddProductDto, ProductQueryDto, UpdateProductDto } from './product-dto';

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

  @Get(':id')
  @ApiResponseType(ProductPresenter, false)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.getProductUsecases.getInstance().execute(id);
    return new ProductPresenter(product);
  }

  @Get('')
  @ApiResponseType(ProductPresenter, true)
  async getAll(@Query() query: ProductQueryDto) {
    const { page, limit, categoryId } = query;
    const products = await this.getAllProductUseCases
      .getInstance()
      .execute(page, limit, categoryId);
    return products.map((cate) => new ProductPresenter(cate));
  }

  @Post('')
  @ApiResponseType(ProductPresenter, true)
  async add(@Body() dto: AddProductDto) {
    const productCreated = await this.addProductUseCases.getInstance().execute(dto);
    return new ProductPresenter(productCreated);
  }

  @Put(':id')
  @ApiResponseType(ProductPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    await this.updateProductUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @ApiResponseType(ProductPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteProductUseCases.getInstance().execute(id);
    return 'success';
  }
}
