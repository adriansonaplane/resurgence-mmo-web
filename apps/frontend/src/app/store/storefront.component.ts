import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ApiClient } from '../api/api-client.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-storefront',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="section">
      <h1>Store</h1>
      <p class="lede">Public catalog pages render through SSR. Purchases grant account-level entitlements only after verified webhooks.</p>
      <div class="grid">
        @for (product of products(); track product.slug) {
          <article class="card">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p>{{ product.unitAmount / 100 | currency: product.currency.toUpperCase() }}</p>
            <a class="button" [routerLink]="['/store/products', product.slug]">View</a>
          </article>
        } @empty {
          <p>Store products are loading.</p>
        }
      </div>
    </section>
  `,
})
export class StorefrontComponent implements OnInit {
  private readonly api = inject(ApiClient);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  readonly products = signal<Product[]>([]);

  ngOnInit() {
    this.title.setTitle('Store | Resurgence');
    this.meta.updateTag({ name: 'description', content: 'Account-level access and founder entitlements for Resurgence.' });
    this.api.listProducts().subscribe({
      next: (response) => this.products.set(response.products),
      error: () => this.products.set([]),
    });
  }
}
