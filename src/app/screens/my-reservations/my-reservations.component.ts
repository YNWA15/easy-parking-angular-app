import { Component, OnInit } from '@angular/core';
import { ParkingSpot, Reservation, User } from 'src/app/models';
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


  constructor(private authenticationService: AuthenticationServices, private reservationService: ReservationService) { }
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email')!;
    // console.log(this.userEmail)
    // this.authenticationService.getUserByEmail(this.userEmail).subscribe(x => {

    //   //debugger
    //   this.user = x
    // }

    // )
    this.reservationService.getUserNotEndedReservations(1).subscribe(x=>{//this.authenticationService.loggedUser.id).subscribe(x=>{
      this.activeReservations = x;
      // console.log(x)
    })
    // console.log(this.user?.name)
    // setInterval(x => {
    //   console.log(this.user!.name)
    // }, 1000)


  }
  getActiveReservations(){
    return [1, 2 ,3 ];
   // this.activeReservations = [{id: 1, startReservationPeriod: new Date(), endReservationPeriod: new Date(), createdResrvationTime: new Date(), parkingId:1, spotId: 1, spot: null, }];
  }
  disabledCancel(res: any= null ){
    return false;
  }
  tryEditReservation(reservation: any = null){

  }

  editCarRegForReservation(){
    
  }
  refreshReservations(){
    setTimeout(()=>{
      this.reservationService.getUserNotEndedReservations(1).subscribe(x=>{//this.authenticationService.loggedUser.id).subscribe(x=>{
        this.activeReservations = x;
      })
    }, 500)
    
  }
}
