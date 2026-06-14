import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  readonly isAuthenticated = signal(typeof localStorage !== 'undefined' && Boolean(localStorage.getItem('dev_access_token')));
  readonly roles = signal<string[]>(this.readRoles());

  loginAsPlayer() {
    this.setSession('test-player', ['player']);
  }

  loginAsAdmin() {
    this.setSession('test-admin', ['player', 'super_admin']);
  }

  logout() {
    localStorage.removeItem('dev_access_token');
    localStorage.removeItem('dev_roles');
    this.isAuthenticated.set(false);
    this.roles.set([]);
  }

  private setSession(token: string, roles: string[]) {
    localStorage.setItem('dev_access_token', token);
    localStorage.setItem('dev_roles', JSON.stringify(roles));
    this.isAuthenticated.set(true);
    this.roles.set(roles);
  }

  private readRoles() {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('dev_roles') ?? '[]') as string[];
    } catch {
      return [];
    }
  }
}
