import { Component } from '@angular/core';

@Component({
  selector: 'app-store-cancel',
  template: `
    <section class="section">
      <h1>Checkout canceled</h1>
      <p class="lede">No order or entitlement was created.</p>
      <a class="button" href="/store">Return to Store</a>
    </section>
  `,
})
export class StoreCancelComponent {}
