import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/app/models';
import { RulesForUsingTheAppComponent } from 'src/app/screens/modals/rules-for-using-the-app/rules-for-using-the-app.component';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
// import { TimePickerService } from '../time-picker.service';
import { DatePickerService } from '../date-picker.service';
import { Router } from '@angular/router';
import { ReserveNowComponent } from 'src/app/screens/modals/reserve-now/reserve-now.component';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit, OnDestroy {
  // @Output() onClose = new EventEmitter<any>();
  
  approved: boolean = false;
  credits: number = 0;
  currModal!: HTMLElement;
  constructor(private modalDbService: MdbModalService, 
    private authServie: AuthenticationServices, 
   private modalRef: MdbModalRef<PaymentConfirmationComponent>,
   private modalRef3: MdbModalRef<ReserveNowComponent>,
    private reservationService: ReservationService, private parkingService: ParkingServices, private datePickerService: DatePickerService,
    private router: Router) { }
  ngOnDestroy(): void {
    if (this.reservationService.currentReservation!.id && this.reservationService.currentReservation!.isPaid == false) {
      this.reservationService.deleteReservation(this.reservationService.currentReservation!.id).subscribe();
    }
  }

  timeout!: any;
  ngOnInit(): void {
    this.reservationService.currentReservation = null;
    this.credits = this.authServie.loggedUser?.parkCredits ? this.authServie.loggedUser.parkCredits : 0;
    this.timeout = setTimeout(() => {
     this.modalRef?.close();

      if (this.reservationService.currentReservation!.id) {
        this.reservationService.deleteReservation(this.reservationService.currentReservation!.id).subscribe();
      }

    }, 90000)
  }
  reservation: Reservation | null = null
  haveToPay: boolean = false;
  amauntToPay: number = 0;
  paymessage!: string;

  aproved() {
    debugger
    if (this.reservationService.isReserveFromNow) {
      // console.log(this.parkingService.selectedParking!.id, this.datePickerService.datePickerDate!)
      var a = this.approved.toString();
      if (a == 'false') {
        this.parkingService.getAvaliableSpotsInAParkingForCustomPeriodFromNow(this.parkingService.selectedParking!.id, this.datePickerService.datePickerDate!).subscribe(x => {
          this.parkingService.currParkingAvSpots = x;
          if (this.parkingService.currParkingAvSpots) {
            this.reservationService.postReservationFromNow(this.parkingService.selectedParking!.id, this.parkingService.currParkingAvSpots![0].id, this.datePickerService.datePickerDate!, this.authServie.loggedUser.id, this.reservationService.carRegNumber).subscribe(x => {
              this.reservation = x;
              this.reservationService.currentReservation = x;
              if (this.reservation!.price > this.authServie.loggedUser.parkCredits!) {

                this.haveToPay = true;
                this.amauntToPay = this.reservation?.price! - this.authServie.loggedUser.parkCredits!
                this.paymessage = 'Тъй като имате ' + this.authServie.loggedUser.parkCredits! + ' кредита, трябва да заплатите ' + this.amauntToPay + ' лв., за да завършите резервацията.';
              } else {
                this.haveToPay = false;
                this.reservationService.removeCreditsFromUserForReservation(this.authServie.loggedUser.id, this.reservation?.price!).subscribe();
                this.reservationService.currentReservation!.isPaid = true;
                this.reservationService.payReservation(this.reservationService.currentReservation!.id).subscribe();
                this.authServie.loggedUser.parkCredits = this.authServie.loggedUser.parkCredits! - this.reservation?.price!;
                this.paymessage = 'Тъй като имате ' + this.authServie.loggedUser.parkCredits! + ' кредита, не е нужно да заплащате допълнителна сума! Мястото е резервирано !';
                setTimeout(() => {
                  this.router.navigate(['/welcome']);
                 this.modalRef?.close();
                  this.modalRef3.close();

                }, 2500)
              }
            })
          }

        })
      }
    } else {
      var a = this.approved.toString();
      if (a == 'false') {
        this.parkingService.getAvaliableSpotsInAParkingForCustomPeriod(this.parkingService.selectedParking!.id).subscribe(x => {
          this.parkingService.currParkingAvSpots = x;
          if (this.parkingService.currParkingAvSpots) {
            // debugger
            this.reservationService.postReservation(this.parkingService.selectedParking!.id, this.parkingService.currParkingAvSpots![0].id, this.parkingService.avaliableParkingsFromDate!, this.parkingService.avaliableParkingsToDate!, this.authServie.loggedUser.id, this.reservationService.carRegNumber).subscribe(x => {
              debugger
              this.reservation = x;
              this.reservationService.currentReservation = x;
              if (this.reservation!.price > this.authServie.loggedUser.parkCredits!) {

                this.haveToPay = true;
                this.amauntToPay = this.reservation?.price! - this.authServie.loggedUser.parkCredits!
                this.paymessage = 'Тъй като имате ' + this.authServie.loggedUser.parkCredits! + ' кредита, трябва да заплатите ' + this.amauntToPay + ' лв., за да завършите резервацията.';
              } else {

                this.haveToPay = false;
                this.reservationService.removeCreditsFromUserForReservation(this.authServie.loggedUser.id, this.reservation?.price!).subscribe();
                this.reservationService.currentReservation!.isPaid = true;
                this.reservationService.payReservation(this.reservationService.currentReservation!.id).subscribe();
                this.paymessage = 'Тъй като имате ' + this.authServie.loggedUser.parkCredits! + ' кредита, не е нужно да заплащате допълнителна сума! Мястото е резервирано !';
                setTimeout(() => {
                  this.router.navigate(['/welcome']);
                 this.modalRef?.close();
                 this.modalRef3.close();
          //  this.onClose.emit();
                }, 2500)
              }
            })
          }
        })
      }
    }
  }
  onApprove() {
   this.modalRef?.close();
    clearTimeout(this.timeout);

    this.reservationService.payReservation(this.reservationService.currentReservation!.id).subscribe();
    this.reservationService.currentReservation!.isPaid = true;
    this.reservationService.removeAllCreditsFromUser(this.authServie.loggedUser.id).subscribe();
  }
  openRules() {
    this.modalDbService.open(RulesForUsingTheAppComponent, {
      modalClass: 'modal-xl',
      data: {
        title: 'Modal title',
      },
    })
    setTimeout(()=>{
      window.scroll(0,0);
    }, 1000)
   
  }
  openModal() {
    this.modalRef = this.modalDbService.open(RulesForUsingTheAppComponent, {
      data: {
        title: 'Modal title',
        nonInvasive: true,
      }
    })
  }
}
