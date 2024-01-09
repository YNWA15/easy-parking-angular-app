import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { LoginServices } from 'src/app/services/login.services';
import { ParkingServices } from 'src/app/services/parkings-services';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  logInError!: string | null;
  err!: string;
  unathorized:boolean = true;
  constructor(
    private loginServices: LoginServices,
    private router: Router,
    private authenticationService: AuthenticationServices, private parkingService: ParkingServices
  ) {}

  ngOnInit() {this.unathorized = false}
  home(){
    this.router.navigate(['/welcome']);
  }
  logIn() {
    this.loginServices
      .logInHttpClient(
        this.email.nativeElement.value,
        this.password.nativeElement.value
      )
      .subscribe(
        (data) => {
          localStorage.setItem('email', this.email.nativeElement.value);
          this.authenticationService.isLogged = true;
          this.authenticationService.getUserByEmail(this.email.nativeElement.value).subscribe(x=>{
            this.authenticationService.loggedUser = x;
            this.authenticationService.userId = x.id;
            this.authenticationService.regNumbers = data.vehicles;
          })
          localStorage.setItem('timeLogged', new Date().toString())
          debugger
            if(this.email.nativeElement.value.includes('admin')){
              this.authenticationService.isEmployee = true;
              let a : string = this.email.nativeElement.value.toString();
              a = a.replace('admin', '').toString();
              // a = a.replace('@test', '').toString();
              a = a.replace('@abv.bg', '').toString();
              this.authenticationService.emplyeeParkingId = +a;
              this.router.navigate(['portal']);
            } else {
              this.authenticationService.isEmployee = false;
              this.router.navigate(['welcome']);
            }
        },
        (error) => { this.unathorized = true}
      );
  }
}
