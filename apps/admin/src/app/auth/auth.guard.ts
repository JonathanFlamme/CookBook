import { inject } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateIsAdmin: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  let isAdmin: boolean = false;

  auth.isAdmin$.subscribe((_isAdmin) => {
    isAdmin = _isAdmin;
  });

  if (!isAdmin) {
    auth.logout();
    router.navigate(['401']);
    return false;
  }
  return true;
};
