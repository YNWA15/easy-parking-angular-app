import { Component, Input, } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { PickerInteractionMode } from 'igniteui-angular';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ParkingSpot } from 'src/app/models';
import { DateTimeService } from 'src/app/services/date-time.service';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { PaymentConfirmationComponent } from 'src/app/shared/payment-confirmation/payment-confirmation.component';
import { TimePickerService } from 'src/app/shared/time-picker.service';

@Component({
  selector: 'app-reserve-now',
  templateUrl: './reserve-now.component.html',
  styleUrls: ['./reserve-now.component.scss'],
})
export class ReserveNowComponent {
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm tt';
  public date: Date = new Date();
  showTimepicker = false;
  showdatePicker = true;
  isAvaliableForThisPeriod = false;
  isCheckedForAvaliable = false;
  avaliableSpots: ParkingSpot[] = []
  error: string | null = null;
  carRegNumber!: string;

  @Input() element!: MdbModalRef<ReserveNowComponent>;

  constructor(
    private modalDbService: MdbModalService,
    public parkingService: ParkingServices, private dateTimeService: DateTimeService,
    public timePickerService: TimePickerService, public datePickerService: DatePickerService, private reservationService: ReservationService
  ) { }

  onDateSelected() {
    this.showdatePicker = !this.showdatePicker;
  }

  Cancel() {
    this.element.close();
  }

  checkAvaliable() {
    var toDate = new Date();
    toDate = this.datePickerService.datePickerDate!;
    toDate.setHours(this.timePickerService.singleTime?.getHours()!);
    toDate.setMinutes(this.timePickerService.singleTime?.getMinutes()!);
    if (toDate < new Date()) {
      this.error = 'INVALID PERIOD'
    } else if (toDate < new Date(new Date().setHours(new Date().getHours() + 1))) {
      this.error = 'Cannot reservo for less than hour'
    } else {
      this.error = null;
    }

    this.parkingService.getAvaliableSpotsInAParkingForCustomPeriodFromNow(this.parkingService.selectedParking?.id!, toDate).subscribe(x => {
      debugger
      this.avaliableSpots = x;
      this.isAvaliableForThisPeriod = true;
      this.isCheckedForAvaliable = true;
      this.reservationService.carRegNumber = this.carRegNumber;
    })
  }

  goToPaymant() {
    this.modalDbService.open(PaymentConfirmationComponent, {
      data: {
        title: 'Modal title',
        nonInvasive: true,
      }
    })
  }

  openPickerStart() {
    this.modalDbService.open(TimePickerComponent, {
      modalClass: 'timePickerModal',
    });
  }
}
