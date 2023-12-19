import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './loadingSpinner.services';

export const UserIdentityServerUrl =
  'https://icb-office.icb.bg/DigitalTwinsIdentityServer/';

@Injectable({ providedIn: 'root' })
export class LoginUser {
  email: string = '';
  password: string = '';
}
@Injectable({ providedIn: 'root' })
export class LoginServices {
  constructor(
    private spinnerService: SpinnerService,
    private http: HttpClient
  ) {}

  // logIn(email: string, password: string): Promise<any> {
  // //   console.log(
  // //     `{
  // //     "email": "` +
  // //       email +
  // //       `",
  // //     "password": "` +
  // //       password +
  // //       `"
  // // }`
  // //   );
  //   let url = 'https://localhost:44351/api/users/login';
  //   this.spinnerService.requestStarted();
  //   return fetch(url, {
  //     method: 'POST',
  //     body:
  //       `{
  //       "email": "` +
  //       email +
  //       `",
  //       "password": "` +
  //       password +
  //       `"
  //   }`,
  //     headers: new Headers({
  //       Accept: '*/*',
  //       'Content-Type': 'application/json',
  //     }),
  //     //observe: 'response'
  //   })
  //     .then((res: any) => {
  //       // console.log(res);
  //       if (!res.ok) {
  //         if (res.status === 401 && res.statusText === 'Unauthorized') {
  //           this.spinnerService.requestEnded();
  //           this.spinnerService.resetSpinner();
  //           return null;
  //         } else {
  //           Promise.reject('Error while logging in through the popup !');
  //           this.spinnerService.requestEnded();
  //           this.spinnerService.resetSpinner();
  //           return null;
  //         }
  //       }
  //       let result = res.json();
  //       this.spinnerService.requestEnded();
  //       this.spinnerService.resetSpinner();
  //       return result;
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }



  // signUp(
  //   email: string,
  //   password: string,
  //   name?: string,
  //   phone?: string
  // ): Promise<any> {
  //   let url = 'https://localhost:44351/api/users/register';
  //   this.spinnerService.requestStarted();
  //   return fetch(url, {
  //     method: 'POST',
  //     body:
  //       `{
  //       "name": "` +
  //       name +
  //       `",
  //       "email": "` +
  //       email +
  //       `",
  //       "password": "` +
  //       password +
  //       `",
  //       "phoneNumber": "` +
  //       phone +
  //       `"
  //   }`,
  //     headers: new Headers({
  //       Accept: '*/*',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //     .then((res: any) => {
  //       // console.log(res);
  //       if (!res.ok) {
  //         if (res.status === 401 && res.statusText === 'Unauthorized') {
  //           this.spinnerService.requestEnded();
  //           this.spinnerService.resetSpinner();
  //           return null;
  //         } else {
  //           Promise.reject('Error while logging in through the popup !');
  //           this.spinnerService.requestEnded();
  //           this.spinnerService.resetSpinner();
  //           return null;
  //         }
  //       }
  //       let result = res.json();
  //       this.spinnerService.requestEnded();
  //       this.spinnerService.resetSpinner();
  //       return result;
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }
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
