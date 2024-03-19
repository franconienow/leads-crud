import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserLogoffButtonComponent } from '../user-logoff-button/user-logoff-button.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { AccountSwitchComponent } from '../account-switch/account-switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    UserLogoffButtonComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltip,
    RouterModule,
    AccountSwitchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  sharedService: SharedService = inject(SharedService);
  userIsLoged: boolean = false;
  accountIsSelected: boolean = false;

  ngOnInit(): void {
    this.sharedService.getUserIsLogged().subscribe((logged) => {
      this.userIsLoged = logged;
    });
    this.sharedService.getAccountIsSelected().subscribe((isSelected) => {
      this.accountIsSelected = isSelected;
    });
  }
}
