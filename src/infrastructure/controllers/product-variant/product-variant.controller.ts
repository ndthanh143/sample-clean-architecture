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
import { ProductVariantPresenter } from './product-variant.presenter';
import { GetProductVariantUseCases } from '@/usecases/product-variant/getProductVariant.usecases';
import { UpdateProductVariantUseCases } from '@/usecases/product-variant/updateProductVariant.usecases';
import { GetProductVariantsUseCases } from '@/usecases/product-variant/getProductVariants.usecases';
import { DeleteProductVariantUseCases } from '@/usecases/product-variant/deleteProductVariant.usecases';
import { AddProductVariantUseCases } from '@/usecases/product-variant/addProductVariant.usecases';
import { AddProductVariantDto, UpdateProductVariantDto } from './product-variant.dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('product-variants')
@ApiTags('product-variant')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductVariantPresenter)
export class ProductVariantController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_VARIANT_USECASES_PROXY)
    private readonly getUsecases: UseCaseProxy<GetProductVariantUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_VARIANT_USECASES_PROXY)
    private readonly updateUsecases: UseCaseProxy<UpdateProductVariantUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCT_VARIANTS_USECASES_PROXY)
    private readonly getAllUsecases: UseCaseProxy<GetProductVariantsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_VARIANT_USECASES_PROXY)
    private readonly deleteUsecases: UseCaseProxy<DeleteProductVariantUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_VARIANT_USECASES_PROXY)
    private readonly addUsecases: UseCaseProxy<AddProductVariantUseCases>,
  ) {}

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductVariantPresenter, false)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getUsecases.getInstance().execute(id);
    return new ProductVariantPresenter(result);
  }

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductVariantPresenter, true, true)
  async getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const results = await this.getAllUsecases.getInstance().execute(page, limit);
    return {
      data: results.data.map((item) => new ProductVariantPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductVariantPresenter, true)
  async add(@Body() dto: AddProductVariantDto) {
    const created = await this.addUsecases.getInstance().execute(dto);
    return new ProductVariantPresenter(created);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductVariantPresenter, true)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductVariantDto) {
    await this.updateUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductVariantPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUsecases.getInstance().execute(id);
    return 'success';
  }
}
