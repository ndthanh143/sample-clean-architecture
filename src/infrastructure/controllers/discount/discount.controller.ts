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
import { DiscountPresenter } from './discount.presenter';
import { GetDiscountUseCases } from '@/usecases/discount/getDiscount.usecases';
import { UpdateDiscountUseCases } from '@/usecases/discount/updateDiscount.usecases';
import { GetDiscountsUseCases } from '@/usecases/discount/getDiscounts.usecases';
import { DeleteDiscountUseCases } from '@/usecases/discount/deleteDiscount.usecases';
import { AddDiscountUseCases } from '@/usecases/discount/addDiscount.usecases';
import { AddDiscountDto, UpdateDiscountDto } from './discount.dto';
import { Role } from '@/utils';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('discounts')
@ApiTags('discount')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(DiscountPresenter)
export class DiscountController {
  constructor(
    @Inject(UsecasesProxyModule.GET_DISCOUNT_USECASES_PROXY)
    private readonly getUsecases: UseCaseProxy<GetDiscountUseCases>,
    @Inject(UsecasesProxyModule.PUT_DISCOUNT_USECASES_PROXY)
    private readonly updateUsecases: UseCaseProxy<UpdateDiscountUseCases>,
    @Inject(UsecasesProxyModule.GET_DISCOUNTS_USECASES_PROXY)
    private readonly getAllUsecases: UseCaseProxy<GetDiscountsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_DISCOUNT_USECASES_PROXY)
    private readonly deleteUsecases: UseCaseProxy<DeleteDiscountUseCases>,
    @Inject(UsecasesProxyModule.POST_DISCOUNT_USECASES_PROXY)
    private readonly addUsecases: UseCaseProxy<AddDiscountUseCases>,
  ) {}

  @Get(':id')
  @ApiResponseType(DiscountPresenter, false)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getUsecases.getInstance().execute(id);
    return new DiscountPresenter(result);
  }

  @Get('')
  @ApiResponseType(DiscountPresenter, true, true)
  async getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const results = await this.getAllUsecases.getInstance().execute(page, limit);
    return {
      data: results.data.map((item) => new DiscountPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(DiscountPresenter, true)
  async add(@Body() dto: AddDiscountDto) {
    const created = await this.addUsecases.getInstance().execute(dto);
    return new DiscountPresenter(created);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(DiscountPresenter, true)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiscountDto) {
    await this.updateUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(DiscountPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUsecases.getInstance().execute(id);
    return 'success';
  }
}
