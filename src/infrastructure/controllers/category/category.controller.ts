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
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { CategoryPresenter } from './category.presenter';
import { GetCategoryUseCases } from '@/usecases/category/getCategory.usecases';
import { GetCategoriesUseCases } from '@/usecases/category/getCategories.usecases';
import { DeleteCategoryUseCases } from '@/usecases/category/deleteCategory.usecases';
import { addCategoryUseCases } from '@/usecases/category/addCategory.usecases';
import { AddCategoryDto, UpdateCategoryDto } from './category-dto';
import { UpdateCategoryUseCases } from '@/usecases/category/updateCategory.usecases';
import { Roles } from '@/infrastructure/decorators/roles.decorator';
import { Role } from '@/utils';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';

@Controller('categories')
@ApiTags('category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CategoryPresenter)
export class CategoryController {
  constructor(
    @Inject(UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY)
    private readonly getCategoryUseCases: UseCaseProxy<GetCategoryUseCases>,
    @Inject(UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY)
    private readonly updateCategoryUseCases: UseCaseProxy<UpdateCategoryUseCases>,
    @Inject(UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY)
    private readonly getAllCategoriesUseCases: UseCaseProxy<GetCategoriesUseCases>,
    @Inject(UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY)
    private readonly deleteCategoryUseCases: UseCaseProxy<DeleteCategoryUseCases>,
    @Inject(UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY)
    private readonly addCategoryUseCases: UseCaseProxy<addCategoryUseCases>,
  ) {}

  @Get(':slug')
  @ApiResponseType(CategoryPresenter, false)
  async getCategory(@Param('slug') slug: string) {
    const cate = await this.getCategoryUseCases.getInstance().execute(slug);
    return new CategoryPresenter(cate);
  }

  @Get('')
  @ApiResponseType(CategoryPresenter, true)
  async getCategories() {
    const categories = await this.getAllCategoriesUseCases.getInstance().execute();
    return categories.map((cate) => new CategoryPresenter(cate));
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(CategoryPresenter, true)
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    await this.updateCategoryUseCases.getInstance().execute(id, dto);
    return 'success';
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(CategoryPresenter, true)
  async deleteCate(@Param('id', ParseIntPipe) id: number) {
    await this.deleteCategoryUseCases.getInstance().execute(id);
    return 'success';
  }

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponseType(CategoryPresenter, true)
  async addCate(@Body() dto: AddCategoryDto) {
    const cateCreated = await this.addCategoryUseCases.getInstance().execute(dto);
    return new CategoryPresenter(cateCreated);
  }
}
