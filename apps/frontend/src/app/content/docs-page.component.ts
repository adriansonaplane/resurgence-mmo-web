import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-docs-page',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Documentation</p>
      <h1>{{ slug ? docTitle() : 'Docs' }}</h1>
      <p class="lede">Developer-facing and player-facing documentation is published through Directus-backed content APIs.</p>
      @if (slug) {
        <article class="card article-body">
          {{ docBody() || 'Documentation content is being prepared.' }}
        </article>
        <a class="button secondary" routerLink="/docs">Back to docs</a>
      } @else {
        <div class="content-list">
          @for (doc of docs(); track $index) {
            <article class="card">
              <h2>{{ asRecord(doc)['title'] || 'Document' }}</h2>
            </article>
          } @empty {
            <article class="card">
              <h2>Docs are being prepared</h2>
              <p>Published Directus docs will appear here.</p>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class DocsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly slug = this.route.snapshot.paramMap.get('slug');
  readonly docs = signal<unknown[]>([]);
  readonly docTitle = signal('Docs');
  readonly docBody = signal<string | null>(null);

  ngOnInit() {
    this.title.setTitle(`${this.slug ?? 'Docs'} | Resurgence`);
    this.meta.updateTag({ name: 'description', content: 'Resurgence documentation and portfolio notes.' });
    if (this.slug) {
      this.api.getDoc(this.slug).subscribe({
        next: ({ doc }) => {
          this.docTitle.set(doc.title);
          this.docBody.set(doc.body);
        },
        error: () => this.docBody.set(null),
      });
      return;
    }
    this.api.getDocs().subscribe({ next: ({ docs }) => this.docs.set(docs), error: () => this.docs.set([]) });
  }

  asRecord(value: unknown) {
    return value as Record<string, unknown>;
  }
}
