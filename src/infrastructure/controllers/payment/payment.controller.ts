// src/modules/payment/interfaces/controllers/payment.controller.ts
import { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateStripePaymentIntentUseCases } from '@/usecases/payment/createPaymentIntent.usecases';
import { Controller, Post, Body, Inject, Put, Param, UseGuards } from '@nestjs/common';
import { CreateIntentDto } from './payment.dto';
import { UpdatePaymentUseCases } from '@/usecases/payment/updatePaymentUsecases';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payment')
@ApiResponse({ status: 500, description: 'Internal error' })
export class PaymentController {
  constructor(
    @Inject(UsecasesProxyModule.POST_PAYMENT_INTENT_USECASES_PROXY)
    private readonly CreateStripePaymentIntentUseCases: UseCaseProxy<CreateStripePaymentIntentUseCases>,

    @Inject(UsecasesProxyModule.PUT_PAYMENT_USECASES_PROXY)
    private readonly updatePaymentUsecases: UseCaseProxy<UpdatePaymentUseCases>,
  ) {}

  @Post('/stripe/create-intent')
  async createPaymentIntent(@Body() body: CreateIntentDto) {
    return this.CreateStripePaymentIntentUseCases.getInstance().execute(body.amount);
  }

  @Put(':id/completed')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePaymentCompleted(@Param('id') id: number) {
    return this.updatePaymentUsecases.getInstance().executeCompletedStatus(id);
  }

  @Put(':id/failed')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePaymentFailed(@Param('id') id: number) {
    return this.updatePaymentUsecases.getInstance().executeFailedStatus(id);
  }

  @Put(':id/refunded')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePaymentRefunded(@Param('id') id: number) {
    return this.updatePaymentUsecases.getInstance().executeRefundStatus(id);
  }

  @Put(':id/pending')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePaymentPending(@Param('id') id: number) {
    return this.updatePaymentUsecases.getInstance().executePendingStatus(id);
  }
}
