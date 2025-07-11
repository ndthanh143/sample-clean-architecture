import { JWTConfig } from '@/domain/config/jwt.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { IGoogleAuthService } from '@/domain/adapters/googleAuth.service';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly googleAuthService: IGoogleAuthService,
  ) {}

  async getCookieWithJwtToken(userId: number, email: string) {
    const payload: IJwtServicePayload = { id: userId, email };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime();
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token, maxAge: 15 * 60 * 1000 };
  }

  async getCookieWithJwtRefreshToken(userId: number, email: string) {
    const payload: IJwtServicePayload = { id: userId, email: email };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime();
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, email);
    return {
      token,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  async validateUserForLocalStragtegy(email: string, pass: string) {
    const user = await this.userRepository.getUserLogin(email);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      await this.updateLoginTime(user.email);

      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  async updateLoginTime(email: string) {
    await this.userRepository.updateLastLogin(email);
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(email, currentHashedRefreshToken);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.getUserLogin(email);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hachRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  async validateUserForGoogleStragtegy(idToken: string) {
    return this.googleAuthService.verifyIDToken(idToken);
  }

  async findOrCreateGoogleUser(email: string, name: string, picture: string) {
    return this.userRepository.getUserByEmail(email);
  }
}
