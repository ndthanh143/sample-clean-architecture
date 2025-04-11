import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAuthPresenter } from './auth.presenter';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { AuthLoginDto } from './auth-dto';
import { Response } from 'express';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import JwtRefreshGuard from 'src/infrastructure/common/guards/jwtRefresh.guard';
import { CurrentUser } from 'src/infrastructure/decorators';

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
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Body() auth: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
    const accessTokenInfo = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.email);
    const refreshTokenInfo = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.email);

    res.cookie('accessToken', accessTokenInfo.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(accessTokenInfo.maxAge),
    });
    res.cookie('refreshToken', refreshTokenInfo.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(refreshTokenInfo.maxAge),
    });
    return 'Login successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy.getInstance().execute(request.user.email);
    const response = new IsAuthPresenter();
    response.email = user.email;
    return response;
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ description: 'logout' })
  @ApiResponseType(IsAuthPresenter, false)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    return 'Logout successful';
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(
    @CurrentUser('email') email: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessTokenInfo = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(email);
    response.cookie('accessToken', accessTokenInfo.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: Number(accessTokenInfo.maxAge),
    });
    return 'Refresh successful';
  }
}
