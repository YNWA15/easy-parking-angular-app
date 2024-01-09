import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addCreditsToUser(userId: number, amaunt: number): Observable<any> {
    let url = 'https://localhost:44351/api/users/returnCredits/' + userId + '/' + amaunt;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }

  getAllUsers(): Observable<any> {
    let url = 'https://localhost:44351/api/users';
    return (<any>this.http.get(url)) as Observable<any>;
  }
  getUserByEmail(email: string): Observable<any> {
    let url = `https://localhost:44351/api/users/byemail/${email}`;
    return (<any>this.http.get(url)) as Observable<any>;
  }
  cashOut(userId: number): Observable<any> {
    let url = 'https://localhost:44351/api/users/payCash/' + userId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
}
