import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSessionService } from './auth-session.service';

@Component({
  selector: 'app-login',
  template: `
    <section class="section">
      <h1>Login</h1>
      <p class="lede">Auth0 is the production identity provider. These local buttons seed development tokens only.</p>
      <div class="grid">
        <button type="button" (click)="loginPlayer()">Continue as Player</button>
        <button type="button" (click)="loginAdmin()">Continue as Admin</button>
      </div>
    </section>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthSessionService);
  private readonly router = inject(Router);

  loginPlayer() {
    this.auth.loginAsPlayer();
    void this.router.navigateByUrl('/account');
  }

  loginAdmin() {
    this.auth.loginAsAdmin();
    void this.router.navigateByUrl('/admin');
  }
}
