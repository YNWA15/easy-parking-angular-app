import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-all-parkings-screen',
  templateUrl: './all-parkings-screen.component.html',
  styleUrls: ['./all-parkings-screen.component.css'],
})
export class AllParkingsScreenComponent implements OnInit {
  constructor(private parkingServices: ParkingServices, private router: Router, public reservationService: ReservationService) { }
  parkings!: any;
  parkingsLength: number[] = [];
  isloaded = false;
  ngOnInit(): void {
    if (!this.parkingServices.isSelectedPeriod) {
      this.parkingServices.getAllParkings().subscribe((x) => {
        this.parkings = x;
        for (var i = 0; i < x.length; i++) {
          this.parkingsLength.push(i);
        }

        this.isloaded = true;
      });
    } else {
      this.parkingServices.getAvaliableParkingsForCustomPeriod().subscribe((x) => {
        this.parkings = x;
        for (var i = 0; i < x.length; i++) {
          this.parkingsLength.push(i);
        }
        this.isloaded = true;
      });
    }
  }
}
