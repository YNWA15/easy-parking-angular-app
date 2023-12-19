import { Component } from '@angular/core';
import { Parking, Reservation } from 'src/app/models';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.css'],
})
export class EmployeePortalComponent {
  //@Input() parking!: Parking;
  parking!: Parking;
  //@Input() employee!: Employee;
  //employee!: Employee;
  isBusySpotsScreen:boolean = true;
  screen: string = 'busySpots'

  spots: any[] = [
    {
      id: 1,
      isFree: true,
    },
    {
      id: 2,
      isFree: false,
    },
    {
      id: 3,
      isFree: false,
    },
    {
      id: 4,
      isFree: true,
    },
  ];

  constructor() {}
  reservations!: Reservation[];
  futureReservations!: Reservation[];
}
