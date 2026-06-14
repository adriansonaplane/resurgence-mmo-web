import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

export async function createTestApp() {
  process.env.NODE_ENV = 'test';
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_placeholder';
  process.env.STRIPE_SECRET_KEY = 'sk_test_placeholder';
  process.env.GAME_BACKEND_SERVICE_TOKEN = 'test-game-token';

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter(), { rawBody: true });
  await configureApp(app);
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  return app;
}
