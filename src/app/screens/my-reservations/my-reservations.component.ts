import { Component, OnInit } from '@angular/core';
import { Reservation, User } from 'src/app/models';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private reservationService: ReservationService, private userService: UserService) { }
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email')!;
    this.userService.getUserByEmail(this.userEmail!).subscribe(x => {
      this.reservationService.getUserNotEndedReservations(x.id).subscribe(x => {
        this.activeReservations = x;
      })
    })
  }
  refreshReservations() {
    setTimeout(() => {
      this.reservationService.getUserNotEndedReservations(1).subscribe(x => {
        this.activeReservations = x;
      })
    }, 500)
  }
}
