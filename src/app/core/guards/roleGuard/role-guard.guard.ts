import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { HelperService } from '../../Helper/HelperService';
import { UserRoles } from '../../enums/UserRoles';
import { Router } from 'express';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const helperService = inject(HelperService);
  const router = inject(Router);

  const requiredRoles = route.data?.['userRoles'] as UserRoles[] | undefined;
  
  const userRole = helperService.getCurrentUserRole();
  if (!userRole) {
    return router.createUrlTree(['/login']); // Redirect to login if no role
  }

  if (!requiredRoles || requiredRoles.includes(userRole)) {
    return true;
  }

  return router.parseUrl('/error');
};
