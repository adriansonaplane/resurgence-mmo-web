import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-support-portal',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Support portal</p>
      <h1>Support</h1>
      <p class="lede">Find known issues, submit bug reports, or start sensitive account workflows through reviewed service boundaries.</p>
      <div class="grid">
        <article class="card">
          <h2>Support articles</h2>
          <p>{{ articles().length }} Directus-backed articles ready.</p>
        </article>
        <article class="card">
          <h2>Known issues</h2>
          <p>{{ knownIssues().length }} active references.</p>
          <a class="button secondary" routerLink="/support/known-issues">View known issues</a>
        </article>
        <article class="card">
          <h2>Bug report</h2>
          <p>Authenticated reports are stored by the website database and triaged by support.</p>
          <a class="button secondary" routerLink="/support/bug-report">Submit bug report</a>
        </article>
        <article class="card">
          <h2>Ban appeal</h2>
          <p>Appeals are routed through Account Service boundaries.</p>
          <a class="button secondary" routerLink="/support/ban-appeal">Start appeal</a>
        </article>
      </div>
    </section>
  `,
})
export class SupportPortalComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly articles = signal<unknown[]>([]);
  readonly knownIssues = signal<unknown[]>([]);

  ngOnInit() {
    this.api.listSupportArticles().subscribe({ next: ({ articles }) => this.articles.set(articles), error: () => this.articles.set([]) });
    this.api.listKnownIssues().subscribe({ next: ({ knownIssues }) => this.knownIssues.set(knownIssues), error: () => this.knownIssues.set([]) });
  }
}
