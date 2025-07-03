import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { OrderPresenter } from './order.presenter';
import { AddOrderUseCases } from '@/usecases/order/addOrder.usecases';
import { GetOrdersUseCases } from '@/usecases/order/getOrders.usecases';
import { UpdateOrderUseCases } from '@/usecases/order/updateOrder.usecases';
import { GetOrderUseCases } from '@/usecases/order/getOrder.usecases';
import { AddOrderDto, MyOrderQueryDto, OrderQueryDto, UpdateOrderDto } from './order.dto';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { CurrentUser } from '@/infrastructure/decorators';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';

@Controller('orders')
@ApiTags('order')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(OrderPresenter)
export class OrderController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORDER_USECASES_PROXY)
    private readonly getOrderUseCases: UseCaseProxy<GetOrderUseCases>,
    @Inject(UsecasesProxyModule.PUT_ORDER_USECASES_PROXY)
    private readonly updateOrderUseCases: UseCaseProxy<UpdateOrderUseCases>,
    @Inject(UsecasesProxyModule.GET_ORDERS_USECASES_PROXY)
    private readonly getAllOrdersUseCases: UseCaseProxy<GetOrdersUseCases>,
    @Inject(UsecasesProxyModule.POST_ORDER_USECASES_PROXY)
    private readonly addOrderUseCases: UseCaseProxy<AddOrderUseCases>,
  ) {}

  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get my orders' })
  @ApiResponseType(OrderPresenter, true, true)
  async getMyOrders(@CurrentUser('id') userId: number, @Query() query: MyOrderQueryDto) {
    const { page, limit, status, q } = query;

    const results = await this.getAllOrdersUseCases
      .getInstance()
      .execute({ page, limit, userId, status, q });

    return {
      data: results.data.map((item) => new OrderPresenter(item)),
      meta: results.meta,
    };
  }

  @Get('my-orders/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(OrderPresenter, false)
  async getMyOrderDetail(@CurrentUser('id') userId: number, @Param('id') id: number) {
    const order = await this.getOrderUseCases.getInstance().execute(id);
    if (order.user.id !== userId) {
      throw new ForbiddenException('Unauthorized access to this order');
    }
    return new OrderPresenter(order);
  }

  @Get('/recent-purchase')
  @ApiResponseType(OrderPresenter, true, true)
  async getOrderRecentClient() {
    const results = await this.getAllOrdersUseCases.getInstance().executeGetOrderRecentPurchase();
    return {
      data: results.data.map((item) => new OrderPresenter(item)),
      meta: results.meta,
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(OrderPresenter, false)
  async getById(@Param('id') id: number) {
    const order = await this.getOrderUseCases.getInstance().execute(id);
    return new OrderPresenter(order);
  }

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(OrderPresenter, true, true)
  async getAll(@Query() query: OrderQueryDto) {
    const { page, limit, userId, paymentCode } = query;
    const results = await this.getAllOrdersUseCases
      .getInstance()
      .execute({ page, limit, userId, paymentCode });
    return {
      data: results.data.map((item) => new OrderPresenter(item)),
      meta: results.meta,
    };
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiResponseType(OrderPresenter, true)
  async add(@CurrentUser('id') userId: number, @Body() dto: AddOrderDto) {
    const orderCreated = await this.addOrderUseCases.getInstance().execute(userId, dto);
    return new OrderPresenter(orderCreated);
  }

  @Put(':id/completed')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(OrderPresenter, true)
  async updateStatusCompleted(@Param('id') id: number) {
    await this.updateOrderUseCases.getInstance().executeCompletedStatus(id);
    return 'success';
  }

  @Put(':id/cancel')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(OrderPresenter, true)
  async updateStatusCancel(@Param('id') id: number) {
    await this.updateOrderUseCases.getInstance().executeCancelStatus(id);
    return 'success';
  }

  @Put(':id/pending')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(OrderPresenter, true)
  async updateStatusPending(@Param('id') id: number) {
    await this.updateOrderUseCases.getInstance().executePendingStatus(id);
    return 'success';
  }
}
