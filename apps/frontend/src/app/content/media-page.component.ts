import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-media-page',
  template: `
    <section class="section">
      <p class="eyebrow">Media</p>
      <h1>Media Gallery</h1>
      <p class="lede">Screenshots, mockups, and promotional media will render here through Directus-backed APIs.</p>
      <div class="grid">
        @for (asset of assets(); track $index) {
          <article class="card">
            <h2>{{ asRecord(asset)['title'] || 'Media asset' }}</h2>
          </article>
        } @empty {
          <article class="card">
            <h2>Media assets coming soon</h2>
            <p>Published gallery items will appear here before public launch.</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class MediaPageComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly assets = signal<unknown[]>([]);

  ngOnInit() {
    this.api.getMediaGallery().subscribe({ next: ({ assets }) => this.assets.set(assets), error: () => this.assets.set([]) });
  }

  asRecord(value: unknown) {
    return value as Record<string, unknown>;
  }
}
