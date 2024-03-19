import { Routes } from '@angular/router';
import { LeadsListComponent } from './components/leads-list/leads-list.component';
import { LeadDetailsComponent } from './components/lead-details/lead-details.component';
import { LeadEditComponent } from './components/lead-edit/lead-edit.component';
import { LeadAddComponent } from './components/lead-add/lead-add.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './guards/auth.guard';
import { AccountSelectionComponent } from './components/account-selection/account-selection.component';
import { loginGuard } from './guards/login.guard';
import { accountsGuard } from './guards/accounts.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  {
    path: 'accounts',
    component: AccountSelectionComponent,
    canActivate: [authGuard, accountsGuard],
  },
  {
    path: 'accounts/:account-id/leads',
    component: LeadsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accounts/:account-id/leads/:lead-id',
    component: LeadDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accounts/:account-id/leads/:lead-id/update',
    component: LeadEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accounts/:account-id/add-lead',
    component: LeadAddComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: UserLoginComponent, canActivate: [loginGuard] },
];
