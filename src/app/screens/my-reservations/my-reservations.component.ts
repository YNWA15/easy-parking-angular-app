import { Component, OnInit } from '@angular/core';
import { Reservation, User } from 'src/app/models';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  userEmail!: string;
  user!: User;
  reservations!: Reservation[];
  activeReservations!: Reservation[];

  constructor( private reservationService: ReservationService) { }
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email')!;

    this.reservationService.getUserNotEndedReservations(1).subscribe(x => {
      this.activeReservations = x;
    })
  }
//
  refreshReservations() {
    setTimeout(() => {
      this.reservationService.getUserNotEndedReservations(1).subscribe(x => {
        this.activeReservations = x;
      })
    }, 500)
  }
}
