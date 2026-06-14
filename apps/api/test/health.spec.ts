import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { createTestApp } from './fastify-inject.setup';

describe('Health API', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns ok through Fastify Inject', async () => {
    const response = await app.getHttpAdapter().getInstance().inject({ method: 'GET', url: '/api/v1/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ status: 'ok' });
  });
});
