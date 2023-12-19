import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { GeolocationServices } from 'src/app/services/geolocation-services';
import { PeriodPickerComponent } from '../modals/period-picker/period-picker.component';
import { RequsetPositionComponent } from '../modals/requset-position/requset-position.component';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { RulesForUsingTheAppComponent } from '../modals/rules-for-using-the-app/rules-for-using-the-app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  display: boolean = false;
  closeResult = '';
  isGrantedGeoLocation: boolean = false;
  modalRef: MdbModalRef<WelcomeComponent> | null = null;
  modalRef2!: MdbModalRef<any>;

  constructor(
    private router: Router,
    private modalDbService: MdbModalService,
    public authServices: AuthenticationServices,
    public geolocationServices: GeolocationServices,
    private parkingService: ParkingServices,
    private reservationService: ReservationService,
  ) { }

  onLogin() {
    this.router.navigate(['/login']);
  }
  openModal() {
    this.modalRef = this.modalDbService.open(WelcomeComponent);
  }
  openRequestPositionModal() {
    this.reservationService.isReserveFromNow = true;
    this.geolocationServices.try();
    if (
      this.geolocationServices.resultState == 'prompt' ||
      this.geolocationServices.resultState == 'denied'
    ) {
      this.modalRef = this.modalDbService.open(RequsetPositionComponent, {
      });
    } else {
      this.parkingService.isSelectedPeriod = false;
      this.router.navigate(['/parkings']);
    }
  }

  showModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalDbService.open(modal);
  }

  showModal2(modal: TemplateRef<any>) {
    this.reservationService.isReserveFromNow = false;
    this.modalRef = this.modalDbService.open(modal);
  }

  openRules() {
    this.modalRef2 = this.modalDbService.open(RulesForUsingTheAppComponent, {
      modalClass: 'modal-xl',
    });
  }

  openPeriodPickerModal() {
    this.modalRef2 = this.modalDbService.open(PeriodPickerComponent, {
      modalClass: 'modal-xl',
    });
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  myReservation() {
    this.router.navigate(['/myreservations']);
  }

  click() {
    this.router.navigate(['/parkings']);
  }
}
