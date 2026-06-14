import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthSessionService } from '../auth/auth-session.service';

describe('authGuard', () => {
  it('redirects anonymous users to login', () => {
    const createUrlTree = jest.fn().mockReturnValue('/login');
    TestBed.configureTestingModule({
      providers: [
        AuthSessionService,
        { provide: Router, useValue: { createUrlTree } },
      ],
    });

    localStorage.clear();
    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result).toBe('/login');
  });
});
