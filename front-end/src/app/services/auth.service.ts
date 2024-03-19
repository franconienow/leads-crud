import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public http = inject(HttpClient);
  public apiUrl = 'http://localhost:8080/auth';

  public login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', data);
  }
}
