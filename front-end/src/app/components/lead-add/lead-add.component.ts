import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';
import { MatSelectModule } from '@angular/material/select';
import { LeadStatus } from '../../enums/lead-status';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective,
  ],
  templateUrl: './lead-add.component.html',
  styleUrl: './lead-add.component.css',
  providers: [provideNgxMask()],
})
export class LeadAddComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  accountService: AccountService = inject(AccountService);
  storageService: StorageService = inject(StorageService);
  destroyRef: DestroyRef = inject(DestroyRef);
  snackBar: MatSnackBar = inject(MatSnackBar);

  accountId: string = '';
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
    for (const status of Object.values(LeadStatus)) {
      this.leadStatusList.push(status);
    }
  }

  onSubmit() {
    this.accountService
      .addLeadWithAccount(this.accountId, this.leadForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.leadForm.reset();
          this.openSnackBar('Lead cadastrado com sucesso!');
        },
        error: (e) => {
          this.openSnackBar('Ops! houve um erro ao cadastrar o lead.');
        },
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
      duration: 3000,
    });
  }
}
