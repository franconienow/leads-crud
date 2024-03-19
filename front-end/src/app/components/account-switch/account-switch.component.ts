import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-account-switch',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltip, RouterModule],
  templateUrl: './account-switch.component.html',
  styleUrl: './account-switch.component.css',
})
export class AccountSwitchComponent {
  sharedService: SharedService = inject(SharedService);
  storageService: StorageService = inject(StorageService);
  router: Router = inject(Router);

  onClick() {
    this.storageService.deleteAccountId();
    this.sharedService.setAccountIsSelected(false);
    this.router.navigate(['/accounts']);
  }
}
