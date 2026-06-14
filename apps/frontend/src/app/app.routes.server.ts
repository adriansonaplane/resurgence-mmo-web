import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'faq', renderMode: RenderMode.Prerender },
  { path: 'terms', renderMode: RenderMode.Prerender },
  { path: 'privacy', renderMode: RenderMode.Prerender },
  { path: 'refund-policy', renderMode: RenderMode.Prerender },
  { path: 'community', renderMode: RenderMode.Prerender },
  { path: 'store', renderMode: RenderMode.Server },
  { path: 'store/products/:slug', renderMode: RenderMode.Server },
  { path: 'store/success', renderMode: RenderMode.Server },
  { path: 'store/cancel', renderMode: RenderMode.Server },
  { path: 'news', renderMode: RenderMode.Server },
  { path: 'news/:slug', renderMode: RenderMode.Server },
  { path: 'patch-notes', renderMode: RenderMode.Server },
  { path: 'download', renderMode: RenderMode.Server },
  { path: 'account', renderMode: RenderMode.Client },
  { path: 'admin', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
