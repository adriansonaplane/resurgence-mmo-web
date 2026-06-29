import { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { Response } from 'light-my-request';
import { createTestApp } from './fastify-inject.setup';

type TestHttpMethod = 'GET' | 'POST' | 'PATCH';

describe('Companion API contract additions', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves Directus-backed content placeholders publicly', async () => {
    const docs = await inject('GET', '/api/v1/content/docs');
    expect(docs.statusCode).toBe(200);
    expect(docs.json()).toMatchObject({ sourceOfTruth: 'Directus' });

    const alpha = await inject('GET', '/api/v1/content/alpha-info');
    expect(alpha.statusCode).toBe(200);
    expect(alpha.json().alpha).toMatchObject({ status: 'not_announced' });
  });

  it('serves public profile read-model endpoints without mutating game state', async () => {
    const profile = await inject('GET', '/api/v1/profile/rook');
    expect(profile.statusCode).toBe(200);
    expect(profile.json().profile).toMatchObject({ publicName: 'rook', sourceOfTruth: 'website database' });

    const characters = await inject('GET', '/api/v1/profile/rook/characters');
    expect(characters.statusCode).toBe(200);
    expect(characters.json()).toMatchObject({ sourceOfTruth: 'Game Platform Service read model' });
    expect(characters.json().characters[0]).toMatchObject({ readOnly: true });
  });

  it('protects profile settings and support intake with Auth0', async () => {
    const rejected = await inject('GET', '/api/v1/profile/me');
    expect(rejected.statusCode).toBe(401);

    const updated = await inject('PATCH', '/api/v1/profile/settings', {
      headers: { authorization: 'Bearer test-player' },
      payload: { publicName: 'player-one', visibility: 'public' },
    });
    expect(updated.statusCode).toBe(200);
    expect(updated.json().profile).toMatchObject({ publicName: 'player-one', visibility: 'public' });

    const bugReport = await inject('POST', '/api/v1/support/bug-reports', {
      headers: { authorization: 'Bearer test-player' },
      payload: { title: 'Stuck in town', description: 'Preview report' },
    });
    expect(bugReport.statusCode).toBe(201);
    expect(bugReport.json().bugReport).toMatchObject({ status: 'new', sourceOfTruth: 'website database' });
  });

  it('exposes expanded admin contract routes as audited service-mediated placeholders', async () => {
    const ban = await inject('POST', '/api/v1/admin/accounts/auth0%7Cplayer/ban', {
      headers: { authorization: 'Bearer test-admin' },
      payload: { reason: 'test' },
    });
    expect(ban.statusCode).toBe(201);
    expect(ban.json()).toMatchObject({ status: 'queued_for_account_service' });

    const reset = await inject('POST', '/api/v1/admin/characters/preview-barbarian/reset-request', {
      headers: { authorization: 'Bearer test-admin' },
      payload: { reason: 'stuck character' },
    });
    expect(reset.statusCode).toBe(201);
    expect(reset.json()).toMatchObject({ status: 'queued_for_game_platform_service' });

    const serverStatus = await inject('GET', '/api/v1/admin/server-status', {
      headers: { authorization: 'Bearer test-admin' },
    });
    expect(serverStatus.statusCode).toBe(200);
    expect(serverStatus.json()).toMatchObject({ sourceOfTruth: 'Game Platform Service', placeholder: true });

    const audit = await inject('GET', '/api/v1/admin/audit', {
      headers: { authorization: 'Bearer test-admin' },
    });
    expect(
      audit.json().audit.some((record: { action: string }) => record.action === 'admin.account.ban.requested'),
    ).toBe(true);
    expect(
      audit.json().audit.some((record: { action: string }) => record.action === 'admin.character.reset.requested'),
    ).toBe(true);
  });

  function inject(method: TestHttpMethod, url: string, options: Record<string, unknown> = {}): Promise<Response> {
    return app.getHttpAdapter().getInstance().inject({ method, url, ...options }) as Promise<Response>;
  }
});
