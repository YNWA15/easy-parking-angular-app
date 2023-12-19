import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Reservation } from 'src/app/models';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.scss']
})
export class CancelReservationComponent implements OnInit {
  isCancelationFree: boolean = false;
  returnAmaunt: number = 0;

  @Input() element!: MdbModalRef<CancelReservationComponent>;
  @Input() reservation!: Reservation;
  @Output() onCancelReservation = new EventEmitter();
  constructor(private reservationService: ReservationService) { }
  ngOnInit(): void {
    var c = new Date();
    var a = new Date(new Date().setHours(new Date().getHours()
      + 2));
    var b = new Date(new Date().setMinutes(new Date().getMinutes()
      + 30));
    if (new Date(this.reservation.startReservationPeriod) >= a) {
      this.isCancelationFree = true;
      this.returnAmaunt = this.reservation.price
    } else if (new Date(this.reservation.startReservationPeriod) < a && new Date(this.reservation.startReservationPeriod) > b) {
      this.returnAmaunt = 7 * this.reservation.price / 10;
    } else {
      this.returnAmaunt = this.reservation.price / 2;
    }
  }

  close() {
    this.element.close();
  }

  cancelReservation() {
    this.reservationService.cancelReservation(this.reservation.id).subscribe();
    this.element.close();
    this.onCancelReservation.emit();
  }
}
