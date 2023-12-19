import { Component, OnInit } from '@angular/core';
import { ParkingSpot } from 'src/app/models';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-busy-spots',
  templateUrl: './busy-spots.component.html',
  styleUrls: ['./busy-spots.component.scss']
})
export class BusySpotsComponent implements OnInit {
  constructor(private parkingService: ParkingServices, private reservationService: ReservationService) { }
  ngOnInit(): void {
    this.parkingService.getBusySpotsOnParking(3).subscribe(x => {//////////////
      this.busyParkingSpots = x;
    })
  }
  busyParkingSpots: ParkingSpot[] | null = null;
}
