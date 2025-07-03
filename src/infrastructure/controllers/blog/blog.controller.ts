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
import { BlogPresenter } from './blog.presenter';
import { GetBlogUseCases } from '@/usecases/blog/getBlog.usecases';
import { UpdateBlogUseCases } from '@/usecases/blog/updateBlog.usecases';
import { GetBlogsUseCases } from '@/usecases/blog/getBlogs.usecases';
import { DeleteBlogUseCases } from '@/usecases/blog/deleteBlog.usecases';
import { AddBlogUseCases } from '@/usecases/blog/addBlog.usecases';
import { AddBlogDto, BlogQueryDto, UpdateBlogDto } from './blog-dto';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('blogs')
@ApiTags('blog')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(BlogPresenter)
export class BlogController {
  constructor(
    @Inject(UsecasesProxyModule.GET_BLOG_USECASES_PROXY)
    private readonly getBlogUsecases: UseCaseProxy<GetBlogUseCases>,
    @Inject(UsecasesProxyModule.PUT_BLOG_USECASES_PROXY)
    private readonly updateBlogUsecases: UseCaseProxy<UpdateBlogUseCases>,
    @Inject(UsecasesProxyModule.GET_BLOGS_USECASES_PROXY)
    private readonly getAllBlogsUseCases: UseCaseProxy<GetBlogsUseCases>,
    @Inject(UsecasesProxyModule.DELETE_BLOG_USECASES_PROXY)
    private readonly deleteBlogUseCases: UseCaseProxy<DeleteBlogUseCases>,
    @Inject(UsecasesProxyModule.POST_BLOG_USECASES_PROXY)
    private readonly addBlogUseCases: UseCaseProxy<AddBlogUseCases>,
  ) {}

  @Get(':slug')
  @ApiResponseType(BlogPresenter, false)
  async getBySlug(@Param('slug') slug: string) {
    const blog = await this.getBlogUsecases.getInstance().executeBySlug(slug);
    return new BlogPresenter(blog);
  }

  @Get('')
  @ApiResponseType(BlogPresenter, true)
  async getAll(@Query() query: BlogQueryDto) {
    const { page, limit, categoryId, search } = query;
    const results = await this.getAllBlogsUseCases
      .getInstance()
      .execute(page, limit, categoryId, search);
    return {
      data: results.data.map((cate) => new BlogPresenter(cate)),
      meta: results.meta,
    };
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogPresenter, true)
  async add(@Body() dto: AddBlogDto) {
    const blogCreated = await this.addBlogUseCases.getInstance().execute(dto);
    return new BlogPresenter(blogCreated);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateBlogDto) {
    await this.updateBlogUsecases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(BlogPresenter, true)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteBlogUseCases.getInstance().execute(id);
    return 'success';
  }
}
