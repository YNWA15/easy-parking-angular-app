import { Component } from '@angular/core';
import { Parking, Reservation } from 'src/app/models';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.css'],
})
export class EmployeePortalComponent {
  parking!: Parking;
  isBusySpotsScreen:boolean = true;
  screen: string = 'busySpots';
  reservations!: Reservation[];
  futureReservations!: Reservation[];

  constructor() {}
}
