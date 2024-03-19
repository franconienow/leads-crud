import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private labels = {
    TOKEN_KEY: 'auth-token',
    USER_EMAIL: 'user-email',
    USER_ID: 'user-id',
    ACCOUNT_ID: 'account-id',
    ACCOUNT_NAME: 'account-name',
  };

  public setToken(token: string): void {
    window.sessionStorage.setItem(this.labels.TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(this.labels.TOKEN_KEY) || '';
  }

  public setUserEmail(userEmail: string): void {
    window.sessionStorage.setItem(this.labels.USER_EMAIL, userEmail);
  }

  public getUserEmail(): string {
    return window.sessionStorage.getItem(this.labels.USER_EMAIL) || '';
  }

  public setUserId(userEmail: string): void {
    window.sessionStorage.setItem(this.labels.USER_ID, userEmail);
  }

  public getUserId(): string {
    return window.sessionStorage.getItem(this.labels.USER_ID) || '';
  }

  public setAccountId(accountId: string): void {
    window.sessionStorage.setItem(this.labels.ACCOUNT_ID, accountId);
  }

  public getAccountId(): string {
    return window.sessionStorage.getItem(this.labels.ACCOUNT_ID) || '';
  }

  public setAccountName(accountName: string): void {
    window.sessionStorage.setItem(this.labels.ACCOUNT_NAME, accountName);
  }

  public getAccountName(): string {
    return window.sessionStorage.getItem(this.labels.ACCOUNT_NAME) || '';
  }

  public deleteAccountId(): void {
    window.sessionStorage.removeItem(this.labels.ACCOUNT_ID);
  }

  public flushStorage(): void {
    for (let [key, value] of Object.entries(this.labels)) {
      window.sessionStorage.removeItem(value);
    }
  }
}
