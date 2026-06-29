import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectusService {
  readonly publicUrl = process.env.DIRECTUS_PUBLIC_URL ?? process.env.CMS_PUBLIC_URL ?? 'http://localhost:8055';

  private readonly collections: Record<string, Array<Record<string, unknown>>> = {
    news_posts: [
      {
        slug: 'welcome-to-resurgence',
        title: 'Welcome to Resurgence',
        summary: 'A local mock news post for development and smoke testing.',
        status: 'published',
        published_at: '2026-06-01T00:00:00.000Z',
      },
    ],
    patch_notes: [
      {
        slug: 'mock-alpha-foundation',
        title: 'Mock Alpha Foundation',
        summary: 'Placeholder patch notes for local CMS simulation.',
        status: 'published',
        published_at: '2026-06-02T00:00:00.000Z',
      },
    ],
    docs: [
      {
        slug: 'account-boundary',
        title: 'Account Boundary',
        body: 'Auth0 web login is separate from game-session validation.',
        status: 'published',
      },
    ],
    support_articles: [
      {
        slug: 'account-access',
        title: 'Account Access',
        summary: 'Use local mock login buttons until Auth0 is provisioned.',
        status: 'published',
      },
    ],
    known_issues: [
      {
        slug: 'mock-services',
        title: 'Mock services are enabled',
        summary: 'Local mock services simulate provisioned integrations for development.',
        status: 'investigating',
      },
    ],
    portfolio: [
      {
        slug: 'companion-platform',
        title: 'Companion Web Platform',
        summary: 'Angular SSR, NestJS Fastify, Drizzle, Directus, Auth0, Stripe, and Cloud Run blueprint implementation.',
      },
    ],
    media_gallery: [
      {
        slug: 'fortress-gate',
        title: 'Fortress Gate Mockup',
        summary: 'Placeholder media item for local gallery rendering.',
      },
    ],
    alpha_info: [
      {
        slug: 'alpha-status',
        title: 'Alpha Information',
        status: 'not_announced',
        summary: 'Alpha dates are not announced. Store entitlements remain account-level only.',
      },
    ],
  };

  publishedCollection(collection: string) {
    return this.collections[collection] ?? [];
  }

  publishedItem(collection: string, slug: string) {
    return this.publishedCollection(collection).find((item) => item['slug'] === slug) ?? null;
  }
}
