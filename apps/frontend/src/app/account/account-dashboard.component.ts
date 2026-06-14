import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiClient } from '../api/api-client.service';

interface DashboardData {
  profile: { subject: string; email?: string; roles: string[] };
  characters: unknown[];
  purchases: unknown[];
  entitlements: unknown[];
}

@Component({
  selector: 'app-account-dashboard',
  template: `
    <section class="section">
      <h1>Account Dashboard</h1>
      @if (dashboard(); as data) {
        <div class="grid">
          <article class="card">
            <h2>Profile</h2>
            <p>{{ data.profile.email || data.profile.subject }}</p>
          </article>
          <article class="card">
            <h2>Characters</h2>
            <p>{{ data.characters.length }} summaries. Live inventory remains in the game backend.</p>
          </article>
          <article class="card">
            <h2>Purchases</h2>
            <p>{{ data.purchases.length }} orders</p>
          </article>
          <article class="card">
            <h2>Entitlements</h2>
            <p>{{ data.entitlements.length }} active records</p>
          </article>
        </div>
      } @else {
        <p>Loading account data.</p>
      }
    </section>
  `,
})
export class AccountDashboardComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly dashboard = signal<DashboardData | null>(null);

  ngOnInit() {
    this.api.getDashboard().subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.dashboard.set(null),
    });
  }
}
