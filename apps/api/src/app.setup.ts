import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ErrorEnvelopeFilter } from './common/filters/error-envelope.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestIdInterceptor } from './common/interceptors/request-id.interceptor';

export async function configureApp(app: NestFastifyApplication) {
  app.setGlobalPrefix('api/v1');

  await app.register(helmet as never);
  await app.register(cors as never, {
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:4200'],
    credentials: true,
  });
  await app.register(rateLimit as never, {
    max: 100,
    timeWindow: '1 minute',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ErrorEnvelopeFilter());
  app.useGlobalInterceptors(new RequestIdInterceptor(), new LoggingInterceptor());

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const config = new DocumentBuilder()
      .setTitle('MMO Website API')
      .setVersion('0.1.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  }
}
