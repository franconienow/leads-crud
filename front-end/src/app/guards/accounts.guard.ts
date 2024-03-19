import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const accountsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const accountId = storageService.getAccountId();
  if (!!accountId) {
    return router.navigate(['accounts', accountId, 'leads']);
  }

  return true;
};
