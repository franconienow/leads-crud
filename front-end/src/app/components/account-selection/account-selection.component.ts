import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Account } from '../../models/account';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-account-selection',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './account-selection.component.html',
  styleUrl: './account-selection.component.css',
})
export class AccountSelectionComponent implements OnInit {
  userService = inject(UserService);
  storageService = inject(StorageService);
  sharedService: SharedService = inject(SharedService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  userId: string = '';
  accounts: Account[] = [
    {
      id: 0,
      name: '',
    },
  ];

  ngOnInit(): void {
    this.userId = this.storageService.getUserId();
    this.retrieveAccounts();
  }

  public retrieveAccounts(): void {
    this.userService
      .getAllAccountsFromUser(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.accounts = data;
        },
        error: (e) => console.error(e),
      });
  }

  public onClick(account: Account) {
    this.sharedService.setAccountIsSelected(true);
    this.storageService.setAccountId(account.id.toString());
    this.storageService.setAccountName(account.name);
    this.router.navigate(['accounts', account.id, 'leads']);
  }
}
