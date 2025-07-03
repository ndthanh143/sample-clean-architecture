import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { join } from 'path';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@/infrastructure/config/environment-config/environment-config.service';
import { LoggerService } from '@/infrastructure/logger/logger.service';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { google } from 'googleapis';

const isDev = process.env.NODE_ENV !== 'production';
const templateDir = isDev
  ? join(process.cwd(), 'src/infrastructure/services/mailer/templates')
  : join(__dirname, 'templates');

@Module({
  imports: [
    LoggerModule,
    NestMailerModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: async (config: EnvironmentConfigService) => {
        const clientId = config.getGoogleClientId();
        const clientSecret = config.getGoogleClientSecret();
        const refreshToken = config.getGoogleRefreshToken();
        const redirectUrl = config.getGoogleRedirectUrl();

        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

        oAuth2Client.setCredentials({
          refresh_token: refreshToken,
        });
        const accessTokenObj = await oAuth2Client.getAccessToken();
        const accessToken = accessTokenObj?.token;

        return {
          transport: {
            host: config.getMailerHost(),
            port: config.getMailerPort(),
            auth: {
              type: 'OAuth2',
              user: config.getMailerUser(),
              clientId,
              clientSecret,
              refreshToken,
              accessToken,
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: config.getMailerFrom(),
          },
          template: {
            dir: templateDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailerService, LoggerService],
  exports: [MailerService],
})
export class MailerModule {}
