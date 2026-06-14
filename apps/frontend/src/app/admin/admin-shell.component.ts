import { Component, OnInit, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiClient } from '../api/api-client.service';

@Component({
  selector: 'app-admin-shell',
  imports: [JsonPipe],
  template: `
    <section class="section">
      <h1>Admin Tools</h1>
      <p class="lede">Role-protected operational shell for orders, entitlements, support, and audit review.</p>
      <div class="grid">
        <article class="card"><h2>Orders</h2><p>Lookup and refund review workflows.</p></article>
        <article class="card"><h2>Entitlements</h2><p>Grant/revoke workflows require audit records.</p></article>
        <article class="card"><h2>Support</h2><p>Contact messages and support ticket review.</p></article>
        <article class="card"><h2>Directus</h2><p>Editorial content remains in Directus.</p></article>
      </div>
      <h2>Audit Preview</h2>
      <pre>{{ audit() | json }}</pre>
    </section>
  `,
})
export class AdminShellComponent implements OnInit {
  private readonly api = inject(ApiClient);
  readonly audit = signal<unknown[]>([]);

  ngOnInit() {
    this.api.listAdminAudit().subscribe({
      next: (response) => this.audit.set(response.audit),
      error: () => this.audit.set([]),
    });
  }
}
