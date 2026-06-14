import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const cmsBaseUrl = 'http://localhost:8055';

@Injectable({ providedIn: 'root' })
export class DirectusClient {
  private readonly http = inject(HttpClient);

  publishedCollection<T>(collection: string) {
    return this.http.get<{ data: T[] }>(`${cmsBaseUrl}/items/${collection}`, {
      params: {
        filter: JSON.stringify({ status: { _eq: 'published' } }),
      },
    });
  }
}
