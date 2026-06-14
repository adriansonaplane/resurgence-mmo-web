import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ApiClient } from '../api/api-client.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  template: `
    <section class="section">
      @if (product(); as item) {
        <h1>{{ item.name }}</h1>
        <p class="lede">{{ item.description }}</p>
        <p>{{ item.unitAmount / 100 | currency: item.currency.toUpperCase() }}</p>
        <button type="button" (click)="checkout(item.slug)">Checkout</button>
        @if (message()) {
          <p>{{ message() }}</p>
        }
      } @else {
        <p>Loading product.</p>
      }
    </section>
  `,
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  readonly product = signal<Product | null>(null);
  readonly message = signal('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.api.getProduct(slug).subscribe({
      next: ({ product }) => {
        this.product.set(product);
        this.title.setTitle(`${product.seoTitle} | Resurgence`);
        this.meta.updateTag({ name: 'description', content: product.seoDescription });
      },
      error: () => this.message.set('Product could not be loaded.'),
    });
  }

  checkout(productSlug: string) {
    this.api.createCheckoutSession(productSlug).subscribe({
      next: (session) => {
        this.message.set('Checkout session created. Entitlements are granted only after Stripe verifies payment by webhook.');
        if (session.url) window.location.href = session.url;
      },
      error: () => this.message.set('Login is required before checkout.'),
    });
  }
}
