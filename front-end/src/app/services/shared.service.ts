import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userIsLogged = new BehaviorSubject<boolean>(
    !!this.getUserIdFromStorage()
  );
  private accountIsSelected = new BehaviorSubject<boolean>(
    !!this.getAccountIdFromStorage()
  );

  getUserIsLogged(): Observable<boolean> {
    return this.userIsLogged.asObservable();
  }

  setUserIsLogged(logged: boolean): void {
    this.userIsLogged.next(logged);
  }

  getAccountIsSelected(): Observable<boolean> {
    return this.accountIsSelected.asObservable();
  }

  setAccountIsSelected(isSelected: boolean): void {
    this.accountIsSelected.next(isSelected);
  }

  private getUserIdFromStorage(): string | null {
    return window.sessionStorage.getItem('user-id');
  }

  private getAccountIdFromStorage(): string | null {
    return window.sessionStorage.getItem('account-id');
  }
}
