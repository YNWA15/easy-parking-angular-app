import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginServices {
  constructor(
    private http: HttpClient
  ) { }

  signUpHttpClient(
    email: string,
    password: string,
    name?: string,
    phone?: string
  ): Observable<any> {
    return this.http.post<any>('https://localhost:44351/api/users/register', {
      name: name,
      email: email,
      password: password,
      phoneNumber: phone,
    }) as Observable<any>;
  }
  logInHttpClient(
    email: string,
    password: string,
    name?: string,
    phone?: string
  ): Observable<any> {
    return this.http.post<any>('https://localhost:44351/api/users/login', {
      name: name,
      email: email,
      password: password,
      phoneNumber: phone,
    }) as Observable<any>;
  }
}
