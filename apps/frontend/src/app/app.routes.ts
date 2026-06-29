import { Routes } from '@angular/router';
import { AccountDashboardComponent } from './account/account-dashboard.component';
import { AdminShellComponent } from './admin/admin-shell.component';
import { LoginComponent } from './auth/login.component';
import { AlphaPageComponent } from './content/alpha-page.component';
import { DocsPageComponent } from './content/docs-page.component';
import { MediaPageComponent } from './content/media-page.component';
import { PortfolioPageComponent } from './content/portfolio-page.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { ProfileCharactersComponent } from './profile/profile-characters.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { ContactComponent } from './public/contact.component';
import { PublicPageComponent } from './public/public-page.component';
import { StoreCancelComponent } from './store/checkout-cancel.component';
import { StoreSuccessComponent } from './store/checkout-success.component';
import { ProductDetailComponent } from './store/product-detail.component';
import { StorefrontComponent } from './store/storefront.component';
import { BanAppealComponent } from './support/ban-appeal.component';
import { BugReportComponent } from './support/bug-report.component';
import { KnownIssuesComponent } from './support/known-issues.component';
import { SupportPortalComponent } from './support/support-portal.component';

export const routes: Routes = [
  { path: '', component: PublicPageComponent, data: { title: 'Resurgence', page: 'home' } },
  { path: 'about', component: PublicPageComponent, data: { title: 'About Resurgence', page: 'about' } },
  { path: 'faq', component: PublicPageComponent, data: { title: 'FAQ', page: 'faq' } },
  { path: 'terms', component: PublicPageComponent, data: { title: 'Terms', page: 'terms' } },
  { path: 'privacy', component: PublicPageComponent, data: { title: 'Privacy', page: 'privacy' } },
  { path: 'refund-policy', component: PublicPageComponent, data: { title: 'Refund Policy', page: 'refund-policy' } },
  { path: 'community', component: PublicPageComponent, data: { title: 'Community', page: 'community' } },
  { path: 'download', component: PublicPageComponent, data: { title: 'Download', page: 'download' } },
  { path: 'news', component: PublicPageComponent, data: { title: 'News', page: 'news' } },
  { path: 'news/:slug', component: PublicPageComponent, data: { title: 'News', page: 'news-detail' } },
  { path: 'patch-notes', component: PublicPageComponent, data: { title: 'Patch Notes', page: 'patch-notes' } },
  { path: 'contact', component: ContactComponent },
  { path: 'support', component: SupportPortalComponent },
  { path: 'support/known-issues', component: KnownIssuesComponent },
  { path: 'support/bug-report', component: BugReportComponent, canActivate: [authGuard] },
  { path: 'support/ban-appeal', component: BanAppealComponent, canActivate: [authGuard] },
  { path: 'docs', component: DocsPageComponent },
  { path: 'docs/:slug', component: DocsPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: 'media', component: MediaPageComponent },
  { path: 'alpha', component: AlphaPageComponent },
  { path: 'profile/:publicName', component: ProfilePageComponent },
  { path: 'profile/:publicName/characters', component: ProfileCharactersComponent },
  { path: 'store', component: StorefrontComponent },
  { path: 'store/products/:slug', component: ProductDetailComponent },
  { path: 'store/success', component: StoreSuccessComponent },
  { path: 'store/cancel', component: StoreCancelComponent },
  { path: 'account', component: AccountDashboardComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminShellComponent, canActivate: [authGuard, adminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
