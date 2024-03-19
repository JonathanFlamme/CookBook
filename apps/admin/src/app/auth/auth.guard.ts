import { inject } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { CanActivateFn } from '@angular/router';

export const canActivateIsAdmin: CanActivateFn = () => {
  const auth = inject(AuthService);
  let isAdmin: boolean = false;

  auth.isAdmin$.subscribe((_isAdmin) => {
    isAdmin = _isAdmin;
  });

  if (!isAdmin) {
    auth.logout();
    return false;
  }
  return true;
};
