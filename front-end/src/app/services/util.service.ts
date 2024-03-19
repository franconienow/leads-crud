import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  extractPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/\D/g, '');
  }
}
