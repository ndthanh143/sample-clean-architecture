import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from '@/infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from '@/infrastructure/controllers/controller.module';
import { JwtModule as JwtServiceModule } from '@/infrastructure/services/jwt/jwt.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptModule } from '@/infrastructure/services/bcrypt/bcrypt.module';
import { LocalStrategy } from '@/infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from '@/infrastructure/common/strategies/jwtRefresh.strategy';
import { AppAutoMapperModule } from '@/infrastructure/mapper/automapper.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    BcryptModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    ExceptionsModule,
    JwtServiceModule,
    RepositoriesModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    AppAutoMapperModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
