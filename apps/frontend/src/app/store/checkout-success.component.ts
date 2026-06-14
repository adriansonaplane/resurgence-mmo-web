import { Component } from '@angular/core';

@Component({
  selector: 'app-store-success',
  template: `
    <section class="section">
      <h1>Checkout received</h1>
      <p class="lede">This page is not proof of purchase. Access appears after Stripe sends a verified webhook and the API grants the entitlement.</p>
      <a class="button" href="/account">View Dashboard</a>
    </section>
  `,
})
export class StoreSuccessComponent {}
