import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { LoginServices } from 'src/app/services/login.services';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.scss'],
})
export class SignUpScreenComponent {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  logInError: string[] = [];
  err!: string;
  constructor(
    private loginServices: LoginServices,
    private router: Router,
    private authService: AuthenticationServices
  ) { }
  home() {
    this.router.navigate(['/welcome']);
  }
  signUp() {
    this.logInError = [];
    this.name.nativeElement.value, this.phoneNumber.nativeElement.value;
    if (
      this.name.nativeElement.value == null ||
      this.name.nativeElement.value == ''
    ) {
      this.logInError.push('Не можете да регистрирате акаунт без име!');
    } else if (
      this.phoneNumber.nativeElement.value == null ||
      this.phoneNumber.nativeElement.value == ''
    ) {
      this.logInError.push('Не можете да регистрирате акаунт без телефонен номер!');
    } else {
      this.loginServices
        .signUpHttpClient(
          this.email.nativeElement.value,
          this.password.nativeElement.value,
          this.name.nativeElement.value,
          this.phoneNumber.nativeElement.value
        )
        .subscribe(
          (data) => {
            this.logInError = [];
            localStorage.setItem('email', this.email.nativeElement.value);
            this.authService.isLogged = true;
            this.authService.getUserByEmail(this.email.nativeElement.value).subscribe(x => {
              this.authService.loggedUser = x;
              this.authService.userId = x.id;
              this.authService.regNumbers = data.vehicles;
            })
            localStorage.setItem('timeLogged', new Date().toString())
            this.router.navigate(['welcome']);
            if (this.email.nativeElement.value.includes('admin')) {
              this.authService.isEmployee = true;
            } else {
              this.authService.isEmployee = false;
            }
          },
          (error) => {
            if (error.error?.DuplicateEmail) {
              this.logInError.push(error.error.DuplicateEmail[0]);
            }
            if (error.error?.PasswordRequiresDigit) {
              this.logInError.push(error.error.PasswordRequiresDigit[0]);
            }
            if (error.error?.PasswordRequiresNonAlphanumeric) {
              this.logInError.push(
                error.error.PasswordRequiresNonAlphanumeric[0]
              );
            }
            if (error.error?.PasswordRequiresUpper) {
              this.logInError.push(error.error.PasswordRequiresUpper[0]);
            }
            if (error.error?.PasswordTooShort) {
              this.logInError.push(error.error.PasswordTooShort[0]);
            }
          }
        );
    }
  }
}
