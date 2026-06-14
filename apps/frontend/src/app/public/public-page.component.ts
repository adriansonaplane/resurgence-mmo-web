import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-public-page',
  template: `
    @if (page === 'home') {
      <section class="hero">
        <div class="hero-content">
          <h1>Resurgence</h1>
          <p class="lede">A Diablo-inspired MMORPG platform for news, account access, storefront entitlements, and community updates.</p>
          <a class="button" href="/store">Enter the Store</a>
        </div>
      </section>
    } @else {
      <section class="section">
        <h1>{{ titleText }}</h1>
        <p class="lede">{{ body }}</p>
      </section>
    }
  `,
})
export class PublicPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly page = this.route.snapshot.data['page'] as string;
  readonly titleText = this.route.snapshot.data['title'] as string;
  readonly body = pageBody(this.page);

  constructor() {
    this.title.setTitle(`${this.titleText} | Resurgence`);
    this.meta.updateTag({ name: 'description', content: this.body });
    this.meta.updateTag({ property: 'og:title', content: this.titleText });
  }
}

function pageBody(page: string) {
  const copy: Record<string, string> = {
    about: 'A dark fantasy account and content hub for the Resurgence game world.',
    faq: 'Answers for account access, entitlements, refunds, and launch readiness.',
    terms: 'Terms will be reviewed before production launch.',
    privacy: 'Privacy handling will follow environment-specific legal review before launch.',
    'refund-policy': 'Refund policy content is managed as a stable public page and reviewed before production.',
    community: 'Community updates, guild spotlights, and creator programs will surface here.',
    download: 'The launcher download route is SSR-ready and gated by release status.',
    news: 'Published Directus news content renders here for search and social previews.',
    'patch-notes': 'Published Directus patch notes render here for search and social previews.',
  };
  return copy[page] ?? 'Published public content renders here.';
}
