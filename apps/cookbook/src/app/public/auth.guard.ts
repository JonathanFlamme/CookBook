import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { CanActivateFn } from '@angular/router';

export const canActivateIsLogged: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLogged()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
