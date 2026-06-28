import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const cmsBaseUrl = 'http://localhost:8055';

export interface PublishedContentItem {
  id?: string;
  slug: string;
  title: string;
  summary?: string;
  excerpt?: string;
  description?: string;
  body?: string;
  content?: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  date_created?: string;
}

@Injectable({ providedIn: 'root' })
export class DirectusClient {
  private readonly http = inject(HttpClient);

  publishedCollection<T>(collection: string) {
    return this.http.get<{ data: T[] }>(`${cmsBaseUrl}/items/${collection}`, {
      params: {
        filter: JSON.stringify({ status: { _eq: 'published' } }),
        sort: '-published_at,-date_created',
      },
    });
  }

  publishedItem<T>(collection: string, slug: string) {
    return this.http.get<{ data: T[] }>(`${cmsBaseUrl}/items/${collection}`, {
      params: {
        filter: JSON.stringify({ status: { _eq: 'published' }, slug: { _eq: slug } }),
        limit: 1,
      },
    });
  }
}
