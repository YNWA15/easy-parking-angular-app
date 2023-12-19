import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  navlinks!: { link: string, active: string, txt: string }[];
  length!: number;
  constructor(public authServices: AuthenticationServices, private router: Router, private parkingService: ParkingServices) { }

  toParkingsPage() {
    this.parkingService.isSelectedPeriod = false;
    this.router.navigate(['/parkings'])
  }
  logOut() {
    this.authServices.isLogged = false;
    localStorage.removeItem('email');
    localStorage.removeItem('timeLogged');
    this.authServices.isEmployee = false;
    this.router.navigate(['/welcome'])
  }
  toMyReservations() {
    this.router.navigate(['/myreservations'])
  }
  toHomePage() {
    this.router.navigate(['/welcome'])
  }
}
