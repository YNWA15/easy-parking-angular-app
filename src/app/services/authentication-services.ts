import { Injectable } from '@angular/core';
import { User, Vehicle } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServices {
  public isLogged: boolean = false;
  public loggedUser!: User;
  // public isEemployeeLogged: boolean = false;
  public regNumbers: Vehicle[] | null = null;
  public isEmployee: boolean  | null = null;
  public emplyeeParkingId: number | null = null;
  public userId!: number;

  constructor(private http: HttpClient) {}
  public isAuthenticated(): boolean {
    const email = localStorage.getItem('email');
    if (!email) {
      return false;
    }
    return true;
  }

  public getUserByEmail(email: string) {
    let url = 'https://localhost:44351/api/users/byemail/' + email;
    return (<any>this.http.get(url)) as Observable<any>;
  }


  
}
