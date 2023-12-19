import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Reservation } from 'src/app/models';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-one-hour',
  templateUrl: './add-one-hour.component.html',
  styleUrls: ['./add-one-hour.component.scss']
})
export class AddOneHourComponent implements OnInit {
  message!: string;
  costPerHour!: number;
  showPayment: boolean = false;
  isChangingOnSpotNeeded: boolean = false;
  newSpotId!: number;

  @Input() element!: MdbModalRef<AddOneHourComponent>;
  @Input() reservation!: Reservation;
  @Output() changedReservation = new EventEmitter()
  constructor(private reservationService: ReservationService, private authService: AuthenticationServices, private userService: UserService) { }

  ngOnInit(): void {
    this.checkIfAddingAnHourIsPossible();
  }

  checkIfAddingAnHourIsPossible() {
    this.reservationService.checkIfPossibleAddOneHourToReservation(this.reservation.id).subscribe(x => {
      if (x == this.reservation.spotId) {
        this.isChangingOnSpotNeeded = false;
      } else {
        this.isChangingOnSpotNeeded = true;
        this.newSpotId = x;
      }
      if (x == false) {
        this.message = 'За съжаление, паркинга няма свободно място, за да ви осигури още един час !'
        this.showPayment = false;
      } else {
        this.costPerHour = this.reservation.parking.costPerHour!;
        this.message = 'За да удължите с един час, цената на резервацията ще се увеличи с ' + this.reservation.parking.costPerHour + '. ';
        if (this.authService.loggedUser.parkCredits! >= this.reservation.parking.costPerHour!) {
          this.message = this.message + 'Ще ви бъдат отнети от наличните кредити.';
          this.showPayment = false;
        } else {
          this.message = this.message + 'От наличните ви кредити, не достигат ' +
            (this.authService.loggedUser.parkCredits! - this.reservation.parking.costPerHour!) +
            '. За да увеличите периода трябва да заплатите сумата!';
          this.showPayment = true;
        }
      }
    })
  }
  onCompletedPayment() {
    if (!this.isChangingOnSpotNeeded) {
      this.reservationService.AddOneHourToReservationWithoutChangeSpot(this.reservation.id!).subscribe(x => {
        if (x != null) {
          this.changedReservation.emit()
          this.element.close();
          this.reservation = x;
        }
      })
    } else {
      this.reservationService.AddOneHourToReservationAndChangeSpot(this.reservation.id!, this.newSpotId!).subscribe(x => {
        if (x != null) {

          this.changedReservation.emit()
          this.element.close();
          this.reservation = x;
        }
      })
    }
  }
  addHour() {
    if (!this.isChangingOnSpotNeeded) {
      this.reservationService.AddOneHourToReservationWithoutChangeSpot(this.reservation.id).subscribe(x => {
        if (x != null) {
          this.authService.loggedUser.parkCredits = this.authService.loggedUser.parkCredits! - this.costPerHour;
          this.userService.addCreditsToUser(this.authService.loggedUser.id, this.costPerHour * (-1)).subscribe();
          this.changedReservation.emit()
          this.element.close();
        }
      })
    } else {
      this.reservationService.AddOneHourToReservationAndChangeSpot(this.reservation.id, this.newSpotId).subscribe(x => {
        if (x != null) {
          this.costPerHour;
          this.authService.loggedUser.parkCredits = this.authService.loggedUser.parkCredits! - this.costPerHour;
          this.userService.addCreditsToUser(this.authService.loggedUser.id, this.costPerHour * (-1)).subscribe();
          this.changedReservation.emit()
          this.element.close();
        }
      })
    }
  }
}
