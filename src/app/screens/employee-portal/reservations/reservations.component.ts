import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  constructor(private parkingService: ParkingServices, private authService: AuthenticationServices) { }

  ngOnInit(): void {
    this.parkingService.getParkingFutureReservations(this.authService.emplyeeParkingId!).subscribe(x => {
      this.notStartedReservations = x;
    })
  }
  notStartedReservations!: Reservation[];
  sortedFutureReservations!: Reservation[];
}
