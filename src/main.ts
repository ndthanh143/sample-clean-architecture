import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@/infrastructure/common/filters/exception.filter';
import { LoggerService } from '@/infrastructure/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@/infrastructure/common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('api-docs', app, document);
  }

  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:8080'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
