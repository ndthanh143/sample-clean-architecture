import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from '@/infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from '@/infrastructure/controllers/controller.module';
import { JwtModule as JwtServiceModule } from '@/infrastructure/services/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { BcryptModule } from '@/infrastructure/services/bcrypt/bcrypt.module';
import { LocalStrategy } from '@/infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from '@/infrastructure/common/strategies/jwtRefresh.strategy';
import { AppAutoMapperModule } from '@/infrastructure/mapper/automapper.module';
import { StripeModule } from './infrastructure/services/stripe/stripe.module';
import { RolesGuard } from './infrastructure/common/guards/roles.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { GoogleAuthModule } from './infrastructure/services/googleAuth/googleAuth.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    BcryptModule,
    TypeOrmConfigModule,
    LoggerModule,
    ExceptionsModule,
    PassportModule,
    JwtServiceModule,
    GoogleAuthModule,
    StripeModule,
    RepositoriesModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    AppAutoMapperModule,
    MailerModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy, RolesGuard],
})
export class AppModule {}
