import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public http = inject(HttpClient);
  public apiUrl = 'http://localhost:8080/accounts';

  public getAllLeadsFromAccount(accountId: string): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}/${accountId}/leads`);
  }

  public getLeadByIdFromAccount(accountId: string, leadId: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${accountId}/leads/${leadId}`);
  }

  public addLeadWithAccount(accountId: string, data: any): Observable<Lead> {
    return this.http.post<Lead>(`${this.apiUrl}/${accountId}/leads`, data);
  }

  public updateLeadFromAccount(accountId: string, leadId: string, data: any): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${accountId}/leads/${leadId}`, data);
  }

  public deleteLeadFromAccount(accountId: string, leadId: string): Observable<Lead> {
    return this.http.delete<Lead>(`${this.apiUrl}/${accountId}/leads/${leadId}`);
  }
}
