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
import { BlogCategoryPresenter } from './blog-category.presenter';
import {
  AddBlogCategoryDto,
  BlogCategoryQueryDto,
  UpdateBlogCategoryDto,
} from './blog-category.dto';
import { GetBlogCategoryUseCases } from '@/usecases/blog-category/getBlogCategory.usecases';
import { UpdateBlogCategoryUseCases } from '@/usecases/blog-category/updateBlogCategory.usecases';
import { GetBlogCategoriesUseCases } from '@/usecases/blog-category/getBlogCategories.usecases';
import { DeleteBlogCategoryUseCases } from '@/usecases/blog-category/deleteBlogCategory.usecases';
import { AddBlogCategoryUseCases } from '@/usecases/blog-category/addBlogCategory.usecases';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('blog-categories')
@ApiTags('blog-category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(BlogCategoryPresenter)
export class BlogCategoryController {
  constructor(
    @Inject(UsecasesProxyModule.GET_BLOG_CATEGORY_USECASES_PROXY)
    private readonly getBlogCateUsecases: UseCaseProxy<GetBlogCategoryUseCases>,
    @Inject(UsecasesProxyModule.PUT_BLOG_CATEGORY_USECASES_PROXY)
    private readonly updateBlogCategoryUsecases: UseCaseProxy<UpdateBlogCategoryUseCases>,
    @Inject(UsecasesProxyModule.GET_BLOG_CATEGORIES_USECASES_PROXY)
    private readonly getAllBlogCategoriesUseCases: UseCaseProxy<GetBlogCategoriesUseCases>,
    @Inject(UsecasesProxyModule.DELETE_BLOG_CATEGORY_USECASES_PROXY)
    private readonly deleteBlogCateUseCases: UseCaseProxy<DeleteBlogCategoryUseCases>,
    @Inject(UsecasesProxyModule.POST_BLOG_CATEGORY_USECASES_PROXY)
    private readonly addBlogCateUseCases: UseCaseProxy<AddBlogCategoryUseCases>,
  ) {}

  @Get(':slug')
  @ApiResponseType(BlogCategoryPresenter, false)
  async getBySlug(@Param('slug') slug: string) {
    const cate = await this.getBlogCateUsecases.getInstance().executeBySlug(slug);
    return new BlogCategoryPresenter(cate);
  }

  @Get('')
  @ApiResponseType(BlogCategoryPresenter, true)
  async getAll(@Query() query: BlogCategoryQueryDto) {
    const { page, limit, search } = query;
    const cates = await this.getAllBlogCategoriesUseCases
      .getInstance()
      .execute(page, limit, search);
    return cates.map((cate) => new BlogCategoryPresenter(cate));
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogCategoryPresenter, true)
  async add(@Body() dto: AddBlogCategoryDto) {
    const cateCreated = await this.addBlogCateUseCases.getInstance().execute(dto);
    return new BlogCategoryPresenter(cateCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogCategoryPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateBlogCategoryDto) {
    await this.updateBlogCategoryUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogCategoryPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteBlogCateUseCases.getInstance().execute(id);
    return 'success';
  }
}
