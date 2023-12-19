import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Reservation } from 'src/app/models';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-edit-car-number-component',
  templateUrl: './edit-car-number-component.component.html',
  styleUrls: ['./edit-car-number-component.component.scss']
})
export class EditCarNumberComponentComponent {
  @Input() element!: MdbModalRef<EditCarNumberComponentComponent>;
  @Input() reservation!: Reservation;
  @Output() onUpdateNumber = new EventEmitter<string>();
  newNumber!: string;
  constructor(private reservationService: ReservationService){}
  close(){
    // console.log('here')
    this.element.close();
  }
  save(){
    this.reservationService.changeReservationCarNumber(this.reservation.id, this.newNumber).subscribe();
    this.element.close();
    this.onUpdateNumber.emit(this.newNumber);
  }
}
