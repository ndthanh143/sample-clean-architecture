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
import { ReviewPresenter } from './review.presenter';
import { AddReviewDto, UpdateReviewDto, ReviewQueryDto } from './review.dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';
import { GetReviewUseCases } from '@/usecases/review/getReview.usecases';
import { GetReviewsUseCases } from '@/usecases/review/getReviews.usecases';
import { UpdateReviewUseCases } from '@/usecases/review/updateOrder.usecases';
import { DeleteReviewUseCases } from '@/usecases/review/deleteReview.usecases';
import { AddReviewUseCases } from '@/usecases/review/addReview.usecases';
import { CurrentUser } from '@/infrastructure/decorators';
import { GetStatisticReviewProductUsecases } from '@/usecases/review/getStatisticReviewProduct.usecases';

@Controller('reviews')
@ApiTags('review')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ReviewPresenter)
export class ReviewController {
  constructor(
    @Inject(UsecasesProxyModule.GET_REVIEW_USECASES_PROXY)
    private readonly getReviewUsecases: UseCaseProxy<GetReviewUseCases>,
    @Inject(UsecasesProxyModule.PUT_REVIEW_USECASES_PROXY)
    private readonly updateReviewUsecases: UseCaseProxy<UpdateReviewUseCases>,
    @Inject(UsecasesProxyModule.GET_REVIEWS_USECASES_PROXY)
    private readonly getAllReviewUseCases: UseCaseProxy<GetReviewsUseCases>,
    @Inject(UsecasesProxyModule.GET_STATISTICS_REVIEW_PRODUCT_USECASES_PROXY)
    private readonly getStatisticReviewProductUseCases: UseCaseProxy<GetStatisticReviewProductUsecases>,
    @Inject(UsecasesProxyModule.DELETE_REVIEW_USECASES_PROXY)
    private readonly deleteReviewUseCases: UseCaseProxy<DeleteReviewUseCases>,
    @Inject(UsecasesProxyModule.POST_REVIEW_USECASES_PROXY)
    private readonly addReviewUseCases: UseCaseProxy<AddReviewUseCases>,
  ) {}

  @Get('/statistics/:productId')
  @ApiResponseType(ReviewPresenter, true, true)
  async getStatisticProduct(@Param('productId') productId: number) {
    const results = await this.getStatisticReviewProductUseCases.getInstance().execute(productId);
    return results;
  }

  @Get('')
  @ApiResponseType(ReviewPresenter, true, true)
  async getAll(@Query() query: ReviewQueryDto) {
    const { page, limit, productId } = query;
    const results = await this.getAllReviewUseCases.getInstance().execute(page, limit, productId);
    return {
      data: results.data.map((item) => new ReviewPresenter(item)),
      meta: results.meta,
    };
  }

  @Get(':id')
  @ApiResponseType(ReviewPresenter, false)
  async getById(@Param('id') id: number) {
    const product = await this.getReviewUsecases.getInstance().execute(id);
    return new ReviewPresenter(product);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(ReviewPresenter, true)
  async add(@CurrentUser('id') userId: number, @Body() dto: AddReviewDto) {
    const reviewCreated = await this.addReviewUseCases.getInstance().execute(userId, dto);
    return new ReviewPresenter(reviewCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ReviewPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateReviewDto) {
    await this.updateReviewUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(ReviewPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteReviewUseCases.getInstance().execute(id);
    return 'success';
  }
}
