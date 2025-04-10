import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAuthPresenter } from './auth.presenter';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { AuthLoginDto } from './auth-dto';
import { Response } from 'express';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    // @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    // private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    // @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    // private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @Post('login')
  // @UseGuards(LoginGuard)
  async login(@Body() auth: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
    console.log('hehee');
    const accessTokenInfo = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.email);
    const refreshTokenInfo = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.email);

    res.cookie('accessToken', accessTokenInfo.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: Number(accessTokenInfo.maxAge),
    });
    res.cookie('refreshToken', refreshTokenInfo.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: Number(refreshTokenInfo.maxAge),
    });
    return 'Login successful';
  }
}
