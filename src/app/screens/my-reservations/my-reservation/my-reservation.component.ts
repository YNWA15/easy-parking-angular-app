import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Parking, Reservation } from 'src/app/models';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {
  @Input() reservation !: Reservation;
  @Output() onCancelAReservation = new EventEmitter();
  parking!: Parking;
  modalRef!: MdbModalRef<any>

  constructor(private parkingService: ParkingServices, private modalDbService: MdbModalService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.parkingService.getParkingById(this.reservation.parkingId).subscribe(x => this.parking = x)
  }

  showModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalDbService.open(modal);
  }
  showModal3(modal: TemplateRef<any>) {
    this.modalRef = this.modalDbService.open(modal);
  }
  showModal2(modal: TemplateRef<any>) {
    this.modalRef = this.modalDbService.open(modal);
  }

  startAfter() {
    var now = new Date();
    var ms = new Date(this.reservation!.startReservationPeriod!).getTime() - now.getTime()
    return Math.floor(ms / 60000);
  }
  onCancelReservation() {
    this.onCancelAReservation.emit();
  }
  updatedCarNumber(carNumber: string) {
    this.reservation.carRegNumber = carNumber;
  }
  isReservationStartsSoon() {
    debugger
    if (new Date(this.reservation.startReservationPeriod) >= new Date(new Date().setHours(new Date().getHours() - 2)) || new Date(this.reservation.startReservationPeriod) <= new Date()) {
      return true;
    } else {
      return false;
    }
  }
  changedReservation() {
    this.reservationService.getReservationByID(this.reservation.id).subscribe(x => {
      this.reservation = x;
    })
  }
}