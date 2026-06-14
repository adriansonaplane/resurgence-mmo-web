import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from '../auth/auth-session.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthSessionService);
  const router = inject(Router);
  return auth.roles().includes('super_admin') || router.createUrlTree(['/account']);
};
