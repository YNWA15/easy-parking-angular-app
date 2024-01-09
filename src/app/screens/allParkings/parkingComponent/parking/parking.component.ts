import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Parking, ParkingInfo, ParkingSpot } from 'src/app/models';
import { ReserveNowComponent } from 'src/app/screens/modals/reserve-now/reserve-now.component';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { ParkingOnMapComponent } from 'src/app/shared/parking-on-map/parking-on-map.component';
import { PaymentConfirmationComponent } from 'src/app/shared/payment-confirmation/payment-confirmation.component';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent implements OnInit {
  @Input() id!: number;

  modalRef: MdbModalRef<ParkingComponent> | null = null;
  constructor(
    private reservationService: ReservationService,

    private modalDbService: MdbModalService,
    private parkingService: ParkingServices,
    public authService: AuthenticationServices
  ) { }
  @Input() isPeriodSelected: boolean = false;
  @Input() parking!: Parking;
  @Output() onMapOpening = new EventEmitter();
  //modalRef: MdbModalRef<ParkingFullComponent> | null = null;
  parkingInfo!: ParkingInfo;
  avSpotsInParkingForPeriod: ParkingSpot[] | null = null;
  avSpots: ParkingSpot[] | null = null;


  modalRef2!: MdbModalRef<any>;

  showModal(modal: TemplateRef<any>) {

    this.parkingService.selectedParking = this.parking;
    if (this.isPeriodSelected == false) {
      this.modalRef2 = this.modalDbService.open(modal);
    } else {
      this.parkingService.getAvaliableSpotsInAParkingForCustomPeriod(this.parking.id).subscribe(x => {
        this.parkingService.currParkingAvSpots = x;
      })
      this.modalDbService.open(PaymentConfirmationComponent, {
        data: {
          nonInvasive: true,
        }

      });
    }
  }

  closeModal() {
    this.modalRef2.close();
  }
  ngOnInit(): void {
    if (!this.reservationService.selectedPeriod) {
      this.parkingService.getParkingInfo(this.parking.id).subscribe((x) => {
        this.parkingInfo = x;
        //this.parkingInfo.freeSpotsWithoutFutureReservationsYet = 1;
      });
    } else {
      this.isPeriodSelected = true;

      this.parkingService.getAvaliableSpotsInAParkingForCustomPeriod(this.parking.id).subscribe(x => {
        this.avSpots = x;
      })
    }
  }
  onReserve() {
    this.parkingService.selectedParking = this.parking;

    if (this.isPeriodSelected == false) {
      this.modalRef = this.modalDbService.open(ReserveNowComponent, {
      });
    } else {
      this.reservationService.isReserveFromNow = true;
      this.parkingService.getAvaliableSpotsInAParkingForCustomPeriod(this.parking.id).subscribe(x => {
        this.parkingService.currParkingAvSpots = x;
      })
      this.modalDbService.open(PaymentConfirmationComponent, {
        data: {
          nonInvasive: true,
        }

      });
    }



  }
  viewOnMap() {
    this.parkingService.selectedParking = this.parking;
    let modalRef = this.modalDbService.open(ParkingOnMapComponent);
  }
  isVisibleInformation(info: string): boolean {
    let lev = '';
    let lowLev = '';
    if (this.parkingInfo?.freeSpotsWithoutFutureReservationsYet && this.parkingInfo?.freeSpotsWithoutFutureReservationsYet > 0) {
      lev = 'freeSpotsWithoutFutureReservationsYet'
    }
    if (this.parkingInfo?.avaliableSpotForNext24Hours && this.parkingInfo?.avaliableSpotForNext24Hours > 0) {
      if (lev !== '') {
        lowLev == 'avaliableSpotForNext24Hours';
      }
      lev = lev == '' ? 'avaliableSpotForNext24Hours' : lev
    }
    if (this.parkingInfo?.avaliableSpotForNext12Hours && this.parkingInfo?.avaliableSpotForNext12Hours > 0) {
      if (lev !== '' && lowLev == '') {
        lowLev = 'avaliableSpotForNext12Hours';
      }
      if (lev == '')
        lev = lev == '' ? 'avaliableSpotForNext12Hours' : lev
      lowLev = lowLev == '' ? 'avaliableSpotForNext12Hours' : lev
    }
    if (this.parkingInfo?.avaliableSpotForNext8Hours && this.parkingInfo?.avaliableSpotForNext8Hours > 0) {
      if (lev !== '' && lowLev == '') {
        lowLev = 'avaliableSpotForNext8Hours';
      }
      lev = lev == '' ? 'avaliableSpotForNext8Hours' : lev
    }
    if (this.parkingInfo?.avaliableSpotForNext4Hours && this.parkingInfo?.avaliableSpotForNext4Hours > 0) {
      if (lev !== '' && lowLev == '') {
        lowLev = 'avaliableSpotForNext4Hours';
      }
      lev = lev == '' ? 'avaliableSpotForNext4Hours' : lev
    }
    if (this.parkingInfo?.avaliableSpotForNext2Hours && this.parkingInfo?.avaliableSpotForNext2Hours > 0) {
      if (lev !== '' && lowLev == '') {
        lowLev = 'avaliableSpotForNext2Hours';
      }
      lev = lev == '' ? 'avaliableSpotForNext2Hours' : lev
    }
    if (lev == '') {
      return false;
    }
    else {
      switch (info) {
        case 'freeSpotsWithoutFutureReservationsYet':
          if (lev === info) {
            return true
          }
          break;
        case 'avaliableSpotForNext24Hours':
          if (lev === info || lowLev === info) {
            return true
          }
          break;
        case 'avaliableSpotForNext12Hours':
          if (lev === info || lowLev === info) {
            return true
          }
          break;
        case 'avaliableSpotForNext8Hours':
          if (lev === info || lowLev === info) {
            return true
          }
          break;
        case 'avaliableSpotForNext4Hours':
          if (lev === info || lowLev === info) {
            return true
          }
          break;
        case 'avaliableSpotForNext2Hours':
          if (lev === info || lowLev === info) {
            return true
          }
          break;
      }
      return false;
    }

  }
}
