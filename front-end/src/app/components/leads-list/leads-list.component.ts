import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Lead } from '../../models/lead';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { UtilService } from '../../services/util.service';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltip,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.css',
})
export class LeadsListComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  accountService: AccountService = inject(AccountService);
  storageService: StorageService = inject(StorageService);
  utilService: UtilService = inject(UtilService);
  destroyRef: DestroyRef = inject(DestroyRef);
  snackBar: MatSnackBar = inject(MatSnackBar);

  accountId: string = '';
  accountName: string = '';
  displayedColumns: string[] = [
    'createdOn',
    'firstName',
    'lastName',
    'phone',
    'status',
    'details',
    'edit',
    'delete',
  ];
  firstNameFilter = new FormControl('');
  dataSource!: MatTableDataSource<Lead>;

  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['account-id'];
    this.accountName = this.storageService.getAccountName();
    this.retrieveLeads();
    this.setFirstNameFilter();
  }

  setFirstNameFilter(): void {
    this.firstNameFilter.valueChanges.subscribe((name) => {
      this.dataSource.filter = name ? name : '';
    });
  }

  retrieveLeads(): void {
    this.accountService
      .getAllLeadsFromAccount(this.accountId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Lead[]) => {
          this.dataSource = new MatTableDataSource<Lead>(data);
          this.dataSource.filterPredicate = this.filterPredicate;
          this.dataSource.sort = this.sort;
        },
        error: (e) => console.error(e),
      });
  }

  onDeleteButtonClick(leadId: number) {
    this.accountService
      .deleteLeadFromAccount(this.accountId, leadId.toString())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (this.accountId) {
            this.retrieveLeads();
            this.openSnackBar('Lead removido com sucesso!');
          }
        },
        error: (e) => console.error(e),
      });
  }

  extractPhoneNumber(phoneNumber: string): string {
    return this.utilService.extractPhoneNumber(phoneNumber);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
    });
  }

  filterPredicate(data: any, filter: string): boolean {
    return (
      data.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      data.lastName.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
