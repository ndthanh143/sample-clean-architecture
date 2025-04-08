import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UserPresenter } from './user.presenter';
import { CreateUserDto } from './user.dto';
import { createUserUsecases } from 'src/usecases/user/createUser.usecase';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly createUserUsecasesProxy: UseCaseProxy<createUserUsecases>,
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
}
