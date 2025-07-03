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
import { ProductPlanPresenter } from './product-plan.presenter';
import { GetProductPlanUseCases } from '@/usecases/product-plan/getProductPlan.usecases';
import { UpdateProductPlanUseCases } from '@/usecases/product-plan/updateProductPlan.usecases';
import { GetProductPlansUseCases } from '@/usecases/product-plan/getProductPlans.usecases';
import { DeleteProductPlanUseCases } from '@/usecases/product-plan/deleteProductPlan.usecases';
import { AddProductPlanUseCases } from '@/usecases/product-plan/addProductPlan.usecases';
import { AddProductPlanDto, UpdateProductPlanDto } from './product-plan.dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { Role } from '@/utils';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('product-plans')
@ApiTags('product-plan')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPlanPresenter)
export class ProductPlanController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_PLAN_USECASES_PROXY)
    private readonly getUsecases: UseCaseProxy<GetProductPlanUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_PLAN_USECASES_PROXY)
    private readonly updateUsecases: UseCaseProxy<UpdateProductPlanUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCT_PLANS_USECASES_PROXY)
    private readonly getAllUsecases: UseCaseProxy<GetProductPlansUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_PLAN_USECASES_PROXY)
    private readonly deleteUsecases: UseCaseProxy<DeleteProductPlanUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_PLAN_USECASES_PROXY)
    private readonly addUsecases: UseCaseProxy<AddProductPlanUseCases>,
  ) {}

  @Get('/variant/:variantId')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPlanPresenter, true, false)
  async getAll(@Param('variantId', ParseIntPipe) variantId: number) {
    const results = await this.getAllUsecases.getInstance().executeByVariantId(variantId);
    return results;
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPlanPresenter, false)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getUsecases.getInstance().execute(id);
    return new ProductPlanPresenter(result);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPlanPresenter, true)
  async add(@Body() dto: AddProductPlanDto) {
    const created = await this.addUsecases.getInstance().execute(dto);
    return new ProductPlanPresenter(created);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPlanPresenter, true)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductPlanDto) {
    await this.updateUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ProductPlanPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUsecases.getInstance().execute(id);
    return 'success';
  }
}
