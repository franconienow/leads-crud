import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public http = inject(HttpClient);
  public apiUrl = 'http://localhost:8080/users';

  public getAllAccountsFromUser(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/${userId}/accounts`);
  }
}
