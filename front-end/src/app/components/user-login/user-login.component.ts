import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  authService: AuthService = inject(AuthService);
  storageService: StorageService = inject(StorageService);
  router: Router = inject(Router);
  sharedService: SharedService = inject(SharedService);
  destroyRef: DestroyRef = inject(DestroyRef);
  snackBar: MatSnackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(64),
    ]),
  });

  onSubmit() {
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.storageService.setToken(data.token);
          this.storageService.setUserEmail(data.userEmail);
          this.storageService.setUserId(data.userId);
          this.sharedService.setUserIsLogged(true);
          this.goToAccountSelection();
        },
        error: (e) => {
          this.loginForm.reset();
          this.openSnackBar(
            'Ops! Verifique se digitou seu email e senha corretamente.'
          );
        },
      });
  }

  goToAccountSelection(): void {
    this.router.navigate(['/accounts']);
  }

  getErrorMessage(formFieldName: string): string {
    const formField = this.loginForm.get(formFieldName);

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
