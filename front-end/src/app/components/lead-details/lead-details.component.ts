import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lead } from '../../models/lead';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilService } from '../../services/util.service';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-lead-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-details.component.html',
  styleUrl: './lead-details.component.css',
})
export class LeadDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  accountService: AccountService = inject(AccountService);
  storageService: StorageService = inject(StorageService);
  utilService: UtilService = inject(UtilService);
  destroyRef: DestroyRef = inject(DestroyRef);

  accountId: string = '';
  leadId: string = '';
  lead: Lead = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: '',
    createdOn: '',
  };

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['account-id'];
    this.leadId = this.route.snapshot.params['lead-id'];
    this.getActiveLead();
  }

  getActiveLead(): void {
    this.accountService
      .getLeadByIdFromAccount(this.accountId, this.leadId.toString())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.lead = data;
        },
        error: (e) => console.error(e),
      });
  }

  extractPhoneNumber(phoneNumber: string): string {
    return this.utilService.extractPhoneNumber(phoneNumber);
  }
}
