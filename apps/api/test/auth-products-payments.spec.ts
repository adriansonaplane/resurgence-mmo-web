import { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { Response } from 'light-my-request';
import { createTestApp } from './fastify-inject.setup';

type TestHttpMethod = 'GET' | 'POST' | 'PATCH';

describe('API guards, storefront, checkout, webhooks, and audit', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects account APIs without Auth0 bearer token', async () => {
    const response = await inject('GET', '/api/v1/account/dashboard');
    expect(response.statusCode).toBe(401);
  });

  it('exposes Account Service boundary placeholders without creating a game session', async () => {
    const status = await inject('GET', '/api/v1/account/status', {
      headers: { authorization: 'Bearer test-player' },
    });
    expect(status.statusCode).toBe(200);
    expect(status.json().status).toMatchObject({
      auth0Subject: 'auth0|player',
      source: 'stub',
      accountState: 'active',
      gameSessionEligible: false,
    });

    const gameSession = await inject('POST', '/api/v1/account/game-session/request-placeholder', {
      headers: { authorization: 'Bearer test-player' },
    });
    expect(gameSession.statusCode).toBe(201);
    expect(gameSession.json().gameSession).toMatchObject({
      status: 'contract_placeholder',
      webSessionIsGameSession: false,
      gatewayValidationRequired: true,
    });
  });

  it('returns only visible storefront products', async () => {
    const response = await inject('GET', '/api/v1/store/products');
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.products).toHaveLength(2);
    expect(body.products.some((product: { slug: string }) => product.slug === 'internal-test-product')).toBe(false);
  });

  it('validates checkout session input', async () => {
    const response = await inject('POST', '/api/v1/payments/checkout-session', {
      headers: { authorization: 'Bearer test-player' },
      payload: {},
    });
    expect(response.statusCode).toBe(400);
  });

  it('creates checkout session without granting entitlement', async () => {
    const checkout = await inject('POST', '/api/v1/payments/checkout-session', {
      headers: { authorization: 'Bearer test-player' },
      payload: { productSlug: 'founder-pack' },
    });
    expect(checkout.statusCode).toBe(201);
    expect(checkout.json()).toMatchObject({ grantsEntitlement: false });

    const dashboard = await inject('GET', '/api/v1/account/dashboard', {
      headers: { authorization: 'Bearer test-player' },
    });
    expect(dashboard.json().entitlements).toHaveLength(0);
  });

  it('rejects invalid Stripe webhook signatures', async () => {
    const event = stripeCheckoutEvent('evt_invalid');
    const response = await inject('POST', '/api/v1/webhooks/stripe', {
      headers: { 'stripe-signature': 'bad_signature' },
      payload: event,
    });
    expect(response.statusCode).toBe(400);
  });

  it('processes verified Stripe webhook once and grants entitlement idempotently', async () => {
    const event = stripeCheckoutEvent('evt_checkout_complete');
    const first = await inject('POST', '/api/v1/webhooks/stripe', {
      headers: { 'stripe-signature': 'test_valid_signature' },
      payload: event,
    });
    expect(first.statusCode).toBe(201);
    expect(first.json()).toMatchObject({ processed: true });

    const duplicate = await inject('POST', '/api/v1/webhooks/stripe', {
      headers: { 'stripe-signature': 'test_valid_signature' },
      payload: event,
    });
    expect(duplicate.statusCode).toBe(201);
    expect(duplicate.json()).toMatchObject({ processed: false });

    const dashboard = await inject('GET', '/api/v1/account/dashboard', {
      headers: { authorization: 'Bearer test-player' },
    });
    expect(dashboard.json().purchases).toHaveLength(1);
    expect(dashboard.json().entitlements).toHaveLength(1);
  });

  it('protects admin APIs by role and creates audit records for admin grants', async () => {
    const rejected = await inject('GET', '/api/v1/admin/orders', {
      headers: { authorization: 'Bearer test-player' },
    });
    expect(rejected.statusCode).toBe(403);

    const granted = await inject('POST', '/api/v1/admin/entitlements/grant', {
      headers: { authorization: 'Bearer test-admin' },
      payload: { auth0Subject: 'auth0|player', entitlementKey: 'beta_access' },
    });
    expect(granted.statusCode).toBe(201);

    const audit = await inject('GET', '/api/v1/admin/audit', {
      headers: { authorization: 'Bearer test-admin' },
    });
    expect(audit.json().audit.some((record: { action: string }) => record.action === 'admin.entitlement.grant')).toBe(true);
    expect(
      audit
        .json()
        .audit.some(
          (record: { action: string; metadata?: { handoffId?: string } }) =>
            record.action === 'entitlement.granted' && record.metadata?.handoffId?.startsWith('entitlement_handoff_'),
        ),
    ).toBe(true);
  });

  it('rejects staff roles that do not carry required permissions', async () => {
    const response = await inject('GET', '/api/v1/admin/orders', {
      headers: { authorization: 'Bearer test-staff-no-permissions' },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json().error.message).toContain('permission');
  });

  it('accepts contact messages without auth', async () => {
    const response = await inject('POST', '/api/v1/contact', {
      payload: {
        email: 'player@example.com',
        subject: 'Beta access question',
        message: 'When will beta invitations start?',
      },
    });
    expect(response.statusCode).toBe(201);
    expect(response.json().message).toMatchObject({
      email: 'player@example.com',
      subject: 'Beta access question',
    });
  });

  function inject(method: TestHttpMethod, url: string, options: Record<string, unknown> = {}): Promise<Response> {
    return app.getHttpAdapter().getInstance().inject({ method, url, ...options }) as Promise<Response>;
  }

  function stripeCheckoutEvent(id: string) {
    return {
      id,
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_paid',
          object: 'checkout.session',
          client_reference_id: 'auth0|player',
          amount_total: 2999,
          currency: 'usd',
          metadata: {
            auth0Subject: 'auth0|player',
            productSlug: 'founder-pack',
            entitlementKey: 'founder_pack',
          },
        },
      },
    };
  }
});
