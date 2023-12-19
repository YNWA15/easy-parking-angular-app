import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models';
import { ParkingServices } from 'src/app/services/parkings-services';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  constructor(private parkingService: ParkingServices) { }

  ngOnInit(): void {
    this.parkingService.getParkingFutureReservations(3).subscribe(x => {
      this.notStartedReservations = x;
    })
  }
  notStartedReservations!: Reservation[];
  sortedFutureReservations!: Reservation[];
}
