import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { rawBody: true },
  );

  await configureApp(app);
  await app.listen(Number(process.env.PORT ?? 8080), '0.0.0.0');
}

void bootstrap();
