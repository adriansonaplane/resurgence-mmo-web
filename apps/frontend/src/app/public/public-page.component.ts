import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DirectusClient, PublishedContentItem } from '../api/directus-client';

@Component({
  selector: 'app-public-page',
  imports: [DatePipe, RouterLink],
  template: `
    @if (page === 'home') {
      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">Dark fantasy MMORPG</p>
          <h1>Resurgence</h1>
          <p class="lede">A Diablo-inspired MMORPG platform for news, account access, storefront entitlements, and community updates.</p>
          <div class="actions">
            <a class="button" routerLink="/store">Enter the Store</a>
            <a class="button secondary" routerLink="/news">Read News</a>
          </div>
        </div>
      </section>
      <section class="section feature-strip" aria-label="Platform highlights">
        @for (feature of homeFeatures; track feature.title) {
          <article class="card">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.body }}</p>
          </article>
        }
      </section>
    } @else if (isCmsListing) {
      <section class="section">
        <h1>{{ titleText }}</h1>
        <p class="lede">{{ body }}</p>
        <div class="content-list">
          @for (item of contentItems(); track item.slug) {
            <article class="card content-card">
              <p class="eyebrow">{{ item.published_at || item.date_created | date: 'mediumDate' }}</p>
              <h2>{{ item.title }}</h2>
              <p>{{ item.summary || item.excerpt || item.description }}</p>
              @if (page === 'news') {
                <a class="button secondary" [routerLink]="['/news', item.slug]">Read more</a>
              }
            </article>
          } @empty {
            <article class="card">
              <h2>Content is being prepared</h2>
              <p>Published Directus entries will appear here when the CMS is connected.</p>
            </article>
          }
        </div>
      </section>
    } @else if (page === 'news-detail') {
      <section class="section article-shell">
        @if (selectedItem(); as item) {
          <p class="eyebrow">{{ item.published_at || item.date_created | date: 'mediumDate' }}</p>
          <h1>{{ item.title }}</h1>
          <p class="lede">{{ item.summary || item.excerpt || item.description }}</p>
          <div class="article-body">{{ item.body || item.content || 'Full article body is managed in Directus.' }}</div>
        } @else {
          <h1>News article</h1>
          <p class="lede">Published Directus article content renders here for search and social previews.</p>
        }
      </section>
    } @else {
      <section class="section">
        <h1>{{ titleText }}</h1>
        <p class="lede">{{ body }}</p>
      </section>
    }
  `,
})
export class PublicPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly directus = inject(DirectusClient);

  readonly page = this.route.snapshot.data['page'] as string;
  readonly titleText = this.route.snapshot.data['title'] as string;
  readonly body = pageBody(this.page);
  readonly contentItems = signal<PublishedContentItem[]>([]);
  readonly selectedItem = signal<PublishedContentItem | null>(null);
  readonly homeFeatures = [
    { title: 'Account hub', body: 'Authenticated players can review profile, purchases, entitlements, and character summaries.' },
    { title: 'SSR storefront', body: 'Catalog and product detail pages are SEO-ready while checkout remains webhook-authoritative.' },
    { title: 'CMS publishing', body: 'News, patch notes, pages, FAQs, and announcements flow from published Directus content.' },
  ];

  get isCmsListing() {
    return this.page === 'news' || this.page === 'patch-notes';
  }

  ngOnInit() {
    this.setMeta(this.titleText, this.body);

    if (this.page === 'news') {
      this.loadCollection('news_posts');
    }

    if (this.page === 'patch-notes') {
      this.loadCollection('patch_notes');
    }

    if (this.page === 'news-detail') {
      const slug = this.route.snapshot.paramMap.get('slug') ?? '';
      this.directus.publishedItem<PublishedContentItem>('news_posts', slug).subscribe({
        next: ({ data }) => {
          this.selectedItem.set(data[0] ?? null);
          if (data[0]) this.setMeta(data[0].seo_title || data[0].title, data[0].seo_description || data[0].summary || this.body);
        },
        error: () => this.selectedItem.set(null),
      });
    }
  }

  private loadCollection(collection: 'news_posts' | 'patch_notes') {
    this.directus.publishedCollection<PublishedContentItem>(collection).subscribe({
      next: ({ data }) => this.contentItems.set(data),
      error: () => this.contentItems.set([]),
    });
  }

  private setMeta(title: string, description: string) {
    this.title.setTitle(`${title} | Resurgence`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
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
    'news-detail': 'Published Directus article content renders here for search and social previews.',
    'patch-notes': 'Published Directus patch notes render here for search and social previews.',
  };
  return copy[page] ?? 'Published public content renders here.';
}
