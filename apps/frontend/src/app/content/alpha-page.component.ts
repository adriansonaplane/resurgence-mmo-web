import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-alpha-page',
  imports: [RouterLink],
  template: `
    <section class="section">
      <p class="eyebrow">Launch path</p>
      <h1>Alpha Information</h1>
      <p class="lede">The public website launches before playable Alpha. Account and support features will become available in stages.</p>
      <article class="card">
        <h2>Status: {{ alphaStatus() }}</h2>
        <p>Alpha access and eligibility are account-level entitlements only; live game access remains game-service validated.</p>
        <a class="button secondary" routerLink="/store">Review account entitlements</a>
      </article>
    </section>
  `,
})
export class AlphaPageComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly alphaStatus = signal('not_announced');

  ngOnInit() {
    this.api.getAlphaInfo().subscribe({ next: ({ alpha }) => this.alphaStatus.set(alpha.status), error: () => this.alphaStatus.set('unknown') });
  }
}
