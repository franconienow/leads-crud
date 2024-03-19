import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from '../../models/lead';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';
import { LeadStatus } from '../../enums/lead-status';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './lead-edit.component.html',
  styleUrl: './lead-edit.component.css',
})
export class LeadEditComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  accountService: AccountService = inject(AccountService);
  storageService: StorageService = inject(StorageService);
  destroyRef: DestroyRef = inject(DestroyRef);
  snackBar: MatSnackBar = inject(MatSnackBar);

  accountId: string = '';
  leadId: string = '';
  lead: Lead = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: '',
  };
  leadStatusList: string[] = [];
  leadForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    phone: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['account-id'];
    this.leadId = this.route.snapshot.params['lead-id'];
    for (const status of Object.values(LeadStatus)) {
      this.leadStatusList.push(status);
    }
    this.getActiveLead();
  }

  getActiveLead(): void {
    this.accountService
      .getLeadByIdFromAccount(this.accountId, this.leadId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Lead) => {
          this.lead = data;
          this.updateFormGroupValues();
        },
        error: (e) => console.error(e),
      });
  }

  updateFormGroupValues() {
    const updatedeValues: any = { ...this.lead };
    delete updatedeValues.id;
    delete updatedeValues.createdOn;
    this.leadForm.setValue(updatedeValues);
  }

  onSubmit() {
    this.accountService
      .updateLeadFromAccount(
        this.accountId,
        this.leadId,
        this.leadForm.getRawValue()
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.lead = data;
          this.openSnackBar('Lead atualizado com sucesso!')
        },
        error: (e) => console.error(e),
      });
  }

  getErrorMessage(formFieldName: string): string {
    const formField = this.leadForm.get(formFieldName);

    if (formField?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (formField?.hasError('minlength')) {
      const requiredLength = formField?.errors
        ? formField?.errors['minlength'].requiredLength
        : '';
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (formField?.hasError('maxlength')) {
      const requiredLength = formField?.errors
        ? formField?.errors['maxlength'].requiredLength
        : '';
      return `Campo deve ter no máximo ${requiredLength} caracteres`;
    }

    if (formField?.hasError('email')) {
      return 'Email inválido';
    }

    return 'Campo inválido';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }
}
