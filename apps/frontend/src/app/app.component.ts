import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/">Resurgence</a>
      <nav aria-label="Primary">
        <a routerLink="/store">Store</a>
        <a routerLink="/news">News</a>
        <a routerLink="/community">Community</a>
        <a routerLink="/account">Account</a>
        <a routerLink="/admin">Admin</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
    <footer>
      <span>Website entitlements are account-level only. Live game state remains game-backend-owned.</span>
      <a routerLink="/privacy">Privacy</a>
      <a routerLink="/terms">Terms</a>
    </footer>
  `,
})
export class AppComponent {}
