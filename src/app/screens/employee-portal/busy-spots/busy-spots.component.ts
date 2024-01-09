import { Component, OnInit } from '@angular/core';
import { ParkingSpot } from 'src/app/models';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-busy-spots',
  templateUrl: './busy-spots.component.html',
  styleUrls: ['./busy-spots.component.scss']
})
export class BusySpotsComponent implements OnInit {
  constructor(private parkingService: ParkingServices, private reservationService: ReservationService, private authService: AuthenticationServices) { }
  ngOnInit(): void {
    this.parkingService.getBusySpotsOnParking(this.authService.emplyeeParkingId!).subscribe(x => {//////////////
      this.busyParkingSpots = x;
    })
  }
  busyParkingSpots: ParkingSpot[] | null = null;
}
