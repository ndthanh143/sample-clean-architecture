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
import { GetUserProductDetailUseCases } from '@/usecases/user-product-detail/getUserProductDetail.usecases';
import { UpdateUserProductDetailUseCases } from '@/usecases/user-product-detail/updateUserProductDetail.usecases';
import { GetUserProductDetailsUseCases } from '@/usecases/user-product-detail/getUserProductDetails.usecases';
import { DeleteUserProductDetailUseCases } from '@/usecases/user-product-detail/deleteUserProductDetail.usecases';
import { AddUserProductDetailUseCases } from '@/usecases/user-product-detail/addUserProductDetail.usecases';
import { UserProductDetailPresenter } from './user-product-detail.presenter';
import {
  AddUserProductDetailDto,
  UpdateUserProductDetailDto,
  UserProductDetailQueryDto,
} from './user-product-detail.dto';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { CurrentUser } from '@/infrastructure/decorators';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('user-product-details')
@ApiTags('user-product-detail')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserProductDetailPresenter)
export class UserProductDetailController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly getUserProductDetailUsecases: UseCaseProxy<GetUserProductDetailUseCases>,
    @Inject(UsecasesProxyModule.PUT_USER_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly updateUserProductDetailUsecases: UseCaseProxy<UpdateUserProductDetailUseCases>,
    @Inject(UsecasesProxyModule.GET_USER_PRODUCT_DETAILS_USECASES_PROXY)
    private readonly getAllUserProductDetailUseCases: UseCaseProxy<GetUserProductDetailsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_USER_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly deleteUserProductDetailUseCases: UseCaseProxy<DeleteUserProductDetailUseCases>,
    @Inject(UsecasesProxyModule.POST_USER_PRODUCT_DETAIL_USECASES_PROXY)
    private readonly addUserProductDetailUseCases: UseCaseProxy<AddUserProductDetailUseCases>,
  ) {}

  @Get('my-accounts')
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserProductDetailPresenter, true, true)
  async getMyAccounts(
    @CurrentUser('id') userId: number,
    @Query() query: UserProductDetailQueryDto,
  ) {
    const { page, limit, status, q, sortBy } = query;
    const results = await this.getAllUserProductDetailUseCases
      .getInstance()
      .executeAndHandleExpired({ page, limit, status, userId, q, sortBy });
    return {
      data: results.data.map((item) => new UserProductDetailPresenter(item)),
      meta: results.meta,
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, false)
  async getBySlug(@Param('id') id: number) {
    const product = await this.getUserProductDetailUsecases.getInstance().execute(id);
    return new UserProductDetailPresenter(product);
  }

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, true, true)
  async getAll(@Query() query: UserProductDetailQueryDto) {
    const { page, limit } = query;
    const results = await this.getAllUserProductDetailUseCases.getInstance().execute(page, limit);
    return {
      data: results.data.map((item) => new UserProductDetailPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('bulk')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, true)
  async bulkCreate(@Body() dto: AddUserProductDetailDto[]) {
    const productsCreated = await this.addUserProductDetailUseCases.getInstance().executeBulk(dto);
    return productsCreated.map((item) => new UserProductDetailPresenter(item));
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, true)
  async add(@Body() dto: AddUserProductDetailDto) {
    const productCreated = await this.addUserProductDetailUseCases.getInstance().execute(dto);
    return new UserProductDetailPresenter(productCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateUserProductDetailDto) {
    await this.updateUserProductDetailUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(UserProductDetailPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUserProductDetailUseCases.getInstance().execute(id);
    return 'success';
  }
}
