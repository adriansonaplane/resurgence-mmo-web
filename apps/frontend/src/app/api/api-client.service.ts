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

  getPublicProfile(publicName: string) {
    return this.http.get<{ profile: { publicName: string; displayName: string; visibility: string; sourceOfTruth?: string } }>(
      `${apiBaseUrl}/profile/${publicName}`,
    );
  }

  getPublicProfileCharacters(publicName: string) {
    return this.http.get<{ publicName: string; sourceOfTruth: string; characters: unknown[] }>(
      `${apiBaseUrl}/profile/${publicName}/characters`,
    );
  }

  getPublicProfileAchievements(publicName: string) {
    return this.http.get<{ publicName: string; sourceOfTruth: string; achievements: unknown[] }>(
      `${apiBaseUrl}/profile/${publicName}/achievements`,
    );
  }

  listSupportArticles() {
    return this.http.get<{ articles: unknown[]; sourceOfTruth: string }>(`${apiBaseUrl}/support/articles`);
  }

  listKnownIssues() {
    return this.http.get<{ knownIssues: unknown[]; sourceOfTruth: string }>(`${apiBaseUrl}/support/known-issues`);
  }

  createBugReport(report: { title: string; description: string }) {
    return this.http.post(`${apiBaseUrl}/support/bug-reports`, report);
  }

  createBanAppeal(appeal: { appealText: string }) {
    return this.http.post(`${apiBaseUrl}/support/ban-appeals`, appeal);
  }

  getDocs() {
    return this.http.get<{ docs: unknown[]; sourceOfTruth: string }>(`${apiBaseUrl}/content/docs`);
  }

  getDoc(slug: string) {
    return this.http.get<{ doc: { slug: string; title: string; body: string | null }; sourceOfTruth: string }>(
      `${apiBaseUrl}/content/docs/${slug}`,
    );
  }

  getPortfolio() {
    return this.http.get<{ projects: unknown[]; sourceOfTruth: string }>(`${apiBaseUrl}/content/portfolio`);
  }

  getMediaGallery() {
    return this.http.get<{ assets: unknown[]; sourceOfTruth: string }>(`${apiBaseUrl}/content/media-gallery`);
  }

  getAlphaInfo() {
    return this.http.get<{ alpha: { status: string }; sourceOfTruth: string }>(`${apiBaseUrl}/content/alpha-info`);
  }

  listAdminAudit() {
    return this.http.get<{ audit: unknown[] }>(`${apiBaseUrl}/admin/audit`);
  }
}
