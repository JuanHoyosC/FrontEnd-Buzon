import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http: HttpClient) { }

  sendFiles(data) {
    return this.http.post('http://localhost:4000', data);
  }

  sendEmail(data) {
    return this.http.post('http://localhost:4000/email', data);
  }


}
