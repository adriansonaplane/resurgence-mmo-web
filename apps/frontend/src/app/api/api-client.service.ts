import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';

const apiBaseUrl = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);

  listProducts() {
    return this.http.get<{ products: Product[] }>(`${apiBaseUrl}/store/products`);
  }

  getProduct(slug: string) {
    return this.http.get<{ product: Product }>(`${apiBaseUrl}/store/products/${slug}`);
  }

  createCheckoutSession(productSlug: string) {
    return this.http.post<{ id: string; url: string; grantsEntitlement: boolean }>(`${apiBaseUrl}/payments/checkout-session`, {
      productSlug,
    });
  }

  getDashboard() {
    return this.http.get<{
      profile: { subject: string; email?: string; roles: string[] };
      characters: unknown[];
      purchases: unknown[];
      entitlements: unknown[];
    }>(`${apiBaseUrl}/account/dashboard`);
  }

  createContactMessage(message: { email: string; subject: string; message: string }) {
    return this.http.post(`${apiBaseUrl}/contact`, message);
  }

  listAdminAudit() {
    return this.http.get<{ audit: unknown[] }>(`${apiBaseUrl}/admin/audit`);
  }
}
