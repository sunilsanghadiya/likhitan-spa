import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HelperService } from '../../Helper/HelperService';
import { UserRoles } from '../../enums/UserRoles';

export const roleResolverResolver: ResolveFn<UserRoles> = (route, state) => {
  const helperService = inject(HelperService);
  return helperService.getCurrentUserRole();
};
