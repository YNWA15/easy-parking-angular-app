import { Component, Input } from '@angular/core';
import { Reservation } from 'src/app/models';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  constructor(private reservationService: ReservationService) { }

  @Input() reservation!: Reservation;
  hoursLeft: number = 0;
  minsLeft: number = 0;

  getDayDiff(startDate: Date): number {
    let b = new Date(startDate)
    const msMin = 60 * 1000;
    let now = new Date();
    return Math.round(
      Math.abs(now.getTime() - b!.getTime()) / msMin,
    );
  }
  isActivationEnabled() {
    if (new Date(this.reservation.startReservationPeriod) <= new Date() && !this.reservation.isBlocked || this.reservation.canStartEarly && !this.reservation.isBlocked) {
      return true;
    }
    return false;
  }
  activateReservation() {
    this.reservationService.startReservation(this.reservation.id).subscribe();
  }
}
