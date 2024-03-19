import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-user-logoff-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltip],
  templateUrl: './user-logoff-button.component.html',
  styleUrl: './user-logoff-button.component.css',
})
export class UserLogoffButtonComponent {
  storageService: StorageService = inject(StorageService);
  sharedService: SharedService = inject(SharedService);
  router = inject(Router);

  public onClick(): void {
    this.storageService.flushStorage();
    this.sharedService.setUserIsLogged(false);
    this.goToLogin();
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
