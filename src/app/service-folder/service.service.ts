import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CommunicationService {
  private http = inject(HttpClient)
  private apiUrl = 'https://api.nexskillup.com/communication/send-email';

  constructor() {
  } 

  sendEmail(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
  }
}
