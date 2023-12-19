import { Component, Input, OnInit } from '@angular/core';
import { ParkingSpot, Reservation } from 'src/app/models';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit{
  constructor(private parkingService: ParkingServices, private reservationService: ReservationService) {}
  ngOnInit(): void {
    this.parkingService.getParkingSpotCurretnReservation(this.spot.id).subscribe(x=>{
      
      this.currReservation = x;
    })
  }
  @Input() spot!: ParkingSpot;
  @Input() dummy!: number;
  currReservation: Reservation | null = null;

  
  endReservation(){
    this.reservationService.endReservation(this.currReservation?.id!).subscribe()
  }

}
