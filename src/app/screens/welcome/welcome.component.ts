import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'angular-modal-simple';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
// import { Services } from 'src/app/services';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { GeolocationServices } from 'src/app/services/geolocation-services';
// import { EmployeeValidationComponent } from '../modals/employee-validation/employee-validation.component';
import { PeriodPickerComponent } from '../modals/period-picker/period-picker.component';
import { RequsetPositionComponent } from '../modals/requset-position/requset-position.component';
// import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
// import { ParkingFullComponentComponent } from '../parking-full-component/parking-full-component.component';
// import { MatDialog } from '@angular/material/dialog';
// import { DomSanitizer } from '@angular/platform-browser';
// import { RulesForUsingTheAppComponent } from '../modals/rules-for-using-the-app/rules-for-using-the-app.component';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
//import { LanguageService } from 'src/app/services/language.service';
import { RulesForUsingTheAppComponent } from '../modals/rules-for-using-the-app/rules-for-using-the-app.component';

//import {Modal} from 'bootstrap';

//import { NgbModal, ModalDismissReasons } from 'bootstrap';

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

  constructor(
    // private services: Services,
    private router: Router,
    private modalService: ModalService,
    private modalDbService: MdbModalService,
    public authServices: AuthenticationServices,
    public geolocationServices: GeolocationServices,
    private parkingService: ParkingServices,
    private reservationService: ReservationService,
    //public languageService: LanguageService
  ) {}



  onLogin() {
    this.router.navigate(['/login']);
  }
  openModal() {
    this.modalRef = this.modalDbService.open(WelcomeComponent);
  }
  openRequestPositionModal() {
    this.reservationService.isReserveFromNow = true;
    this.geolocationServices.try();
    //debugger
    if (
      this.geolocationServices.resultState == 'prompt' ||
      this.geolocationServices.resultState == 'denied'
    ) {
      this.modalRef = this.modalDbService.open(RequsetPositionComponent, {
        //modalClass: 'modal-xl'
      });
      //this.geolocationServices.getLocation();
    } else {
      ////
      this.parkingService.isSelectedPeriod = false;
      this.router.navigate(['/parkings']);
    }

    //if(this.geolocationServices.resultState !== ''){}
  }


  modalRef2!: MdbModalRef<any>;
  // constructor(private modalService: MdbModalService) {}
  // ...
  showModal(modal: TemplateRef<any>) {
    // this.onReserve();
      this.modalRef = this.modalDbService.open(modal);
  }

  showModal2(modal: TemplateRef<any>) {
    // this.onReserve();
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
  

  myReservation(){
    this.router.navigate(['/myreservations']);
  }

  click() {
    this.router.navigate(['/parkings']);
  }

}
