import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '@/domain/config/jwt.interface';
import { MailerConfig } from '@/domain/config/mailer.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, MailerConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  // Mailer Config
  getMailerHost(): string {
    return this.configService.get<string>('MAIL_HOST');
  }
  getMailerPort(): number {
    return this.configService.get<number>('MAIL_PORT');
  }
  getMailerUser(): string {
    return this.configService.get<string>('MAIL_USER');
  }
  getMailerPass(): string {
    return this.configService.get<string>('MAIL_PASS');
  }
  getMailerFrom(): string {
    return this.configService.get<string>('MAIL_FROM');
  }
  getMailerFromName(): string {
    return this.configService.get<string>('MAIL_FROM_NAME');
  }

  // Google config
  getGoogleClientId(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }
  getGoogleClientSecret(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  }
  getGoogleRefreshToken(): string {
    return this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
  }
  getGoogleRedirectUrl(): string {
    return this.configService.get<string>('GOOGLE_REDIRECT_URL');
  }

  //
  getClientSiteUrl(): string {
    return this.configService.get<string>('CLIENT_SITE_URL');
  }
}
