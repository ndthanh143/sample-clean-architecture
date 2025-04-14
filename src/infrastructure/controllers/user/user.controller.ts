import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UserPresenter } from './user.presenter';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { createUserUsecases } from '@/usecases/user/createUser.usecase';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { getUserProfileUsecases } from '@/usecases/user/getProfile.usecase';
import { CurrentUser } from '@/infrastructure/decorators';
import { updateProfileUsecases } from '@/usecases/user/updateProfile.usecase';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly createUserUsecasesProxy: UseCaseProxy<createUserUsecases>,
    @Inject(UsecasesProxyModule.GET_USER_PROFILE_USECASES_PROXY)
    private readonly getUserProfileUsecasesProxy: UseCaseProxy<getUserProfileUsecases>,
    @Inject(UsecasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateProfileUsecasesProxy: UseCaseProxy<updateProfileUsecases>,
  ) {}

  @Post('signup')
  @ApiResponseType(UserPresenter, true)
  async addTodo(@Body() createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;

    const userCreated = await this.createUserUsecasesProxy
      .getInstance()
      .execute(firstName, lastName, email, password);

    return new UserPresenter(userCreated);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'get_profile' })
  @ApiResponseType(UserPresenter, true)
  async getProfile(@CurrentUser('email') email: string) {
    const user = await this.getUserProfileUsecasesProxy.getInstance().execute(email);
    return new UserPresenter(user);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'update_profile' })
  @ApiResponseType(UserPresenter, true)
  async updateProfile(@CurrentUser('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    const userUpdated = await this.updateProfileUsecasesProxy
      .getInstance()
      .execute(email, updateUserDto);
    return new UserPresenter(userUpdated);
  }
}
