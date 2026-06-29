import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-known-issues',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Support portal</p>
      <h1>Known Issues</h1>
      <p class="lede">Known issue references are published through Directus and mirrored through the support API.</p>
      <div class="content-list">
        @for (issue of knownIssues(); track $index) {
          <article class="card">
            <h2>{{ asRecord(issue)['title'] || 'Known issue' }}</h2>
            <p>{{ asRecord(issue)['summary'] || 'Details are being prepared.' }}</p>
          </article>
        } @empty {
          <article class="card">
            <h2>No known issues published</h2>
            <p>Directus-backed known issues will appear here when available.</p>
          </article>
        }
      </div>
      <a class="button secondary" routerLink="/support">Back to support</a>
    </section>
  `,
})
export class KnownIssuesComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly knownIssues = signal<unknown[]>([]);

  ngOnInit() {
    this.api.listKnownIssues().subscribe({ next: ({ knownIssues }) => this.knownIssues.set(knownIssues), error: () => this.knownIssues.set([]) });
  }

  asRecord(value: unknown) {
    return value as Record<string, unknown>;
  }
}
