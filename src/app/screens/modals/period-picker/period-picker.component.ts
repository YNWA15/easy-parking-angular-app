import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { map, Observable, startWith } from 'rxjs';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { TimePickerService } from 'src/app/shared/time-picker.service';
import { TimePickerComponent } from 'src/app/shared/time-picker/time-picker.component';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.css'],
})
export class PeriodPickerComponent implements OnInit {

  startReservation: Date | null = null;
  endReservation: Date | null = null;
  startReservationHour!: number;
  endReservationHour!: number;
  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });
  dateRangeForm!: FormGroup;

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public currentHour: number = this.today.getHours();
  public currentMinute: number = this.today.getMinutes();
  public currentSecond: number = this.today.getSeconds();
  public date: Date = new Date(new Date().setDate(14));
  showTimepicker = false;
  showTimePicker = false;
  showTimePickerForStart: boolean = false;
  showTimePickerForEnd: boolean = false;
  startTimePicker = false;
  error: string | null = null;
  modalRef!: MdbModalRef<any>;

  @Input() element!: MdbModalRef<PeriodPickerComponent>;
  @Input() isInEditMode: boolean = false;

  @Output() onSubmitPeriodInEditMetod = new EventEmitter();
  @ViewChild('timePicker') timePicker!: ElementRef<TimePickerComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private modalDbService: MdbModalService,
    private authenticationService: AuthenticationServices,
    public timePickerService: TimePickerService,
    public datePickerService: DatePickerService,
    private parkingService: ParkingServices,
    private reservationService: ReservationService,
    private router: Router
  ) {
  }
  cancel() {
    this.element.close();
  }

  openPickerStart() {
    this.modalRef = this.modalDbService.open(TimePickerComponent, {
      modalClass: 'timePickerModal',
    });
    this.startTimePicker = true;
    this.timePickerService.pickerForStartOpened = true;
  }
  openPickerEnd() {
    this.modalRef = this.modalDbService.open(TimePickerComponent, {
      modalClass: 'timePickerModal',
    });
    this.startTimePicker = false;
    this.timePickerService.pickerForStartOpened = false;
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getTime();
    return (
      day >=
      new Date(new Date().setHours(new Date().getHours() + 48)).getTime() &&
      day <=
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime()
    );
  };

  errorPeriod() {
    let a = new Date(this.datePickerService.dateRangePickerEndDate!);
    let b = new Date(this.datePickerService.dateRangePickerStartDate!)
    if (b < new Date(new Date().setHours(new Date().getHours() + 2))) {
      this.error = 'Start of the period should be at least two hours after now.'
      return true;
    } else if (this.datePickerService.dateRangePickerStartDate! > new Date(a.setHours(-1))) {
      this.error = 'The period must be at least 1 hour';
      return true;
    } else {
      this.error = null;
      return false;
    }
  }

  onRangeSelected() {
    this.showTimePickerForStart = true;
    this.showTimePickerForEnd = true;
  }

  onSubmit() {
    this.parkingService.avaliableParkingsFromDate =
      this.datePickerService.dateRangePickerStartDate;
    this.parkingService.avaliableParkingsFromDate?.setHours(
      this.timePickerService.timeForStartPeriod!.getHours()
    );
    this.parkingService.avaliableParkingsFromDate?.setMinutes(
      this.timePickerService.timeForStartPeriod!.getMinutes()
    );
    this.parkingService.avaliableParkingsToDate =
      this.datePickerService.dateRangePickerEndDate;
    this.parkingService.avaliableParkingsToDate?.setHours(
      this.timePickerService.timeForEndPeriod!.getHours()
    );
    this.parkingService.avaliableParkingsToDate?.setMinutes(
      this.timePickerService.timeForEndPeriod!.getMinutes()
    );
    if (!this.isInEditMode) {

      this.reservationService.selectedPeriod = true;
      this.parkingService.isSelectedPeriod = true;
      this.reservationService.carRegNumber = this.registrationNumberForTheReservation!;
      this.cancel();
      this.router.navigate(['/parkings']);
    } else {
      this.onSubmitPeriodInEditMetod.emit()
    }
  }

  dateInput() {
    if (this.startReservation && this.startReservation < new Date()) {
      this.startReservation = null;
      this.endReservation = null;
    }
  }
  onSelectStartHour() {
    this.startReservation!.setHours(this.startReservationHour);
  }
  onSelectEndHour() {
    this.endReservation!.setHours(this.endReservationHour);
  }
  disabledStartHourSelect() {
    if (!this.startReservation || !this.endReservation) {
      return false;
    }
    return true;
  }
  onFormSubmit() { }
  checkIfValidStartDate() {
    return null;
  }
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {

    let from = this.dateRangeForm.controls.fromDate.value;
    if (
      new Date(new Date(from).setHours(new Date(from).getHours() - 48)) <
      new Date()
    ) {
      return null;
    }
    return {};
  };

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', [Validators.required]), //, this.dateRangeValidator]),
      end: new FormControl('', Validators.required),
    });

    if (this.authenticationService.regNumbers! && this.authenticationService.regNumbers!.length > 0) {
      this.authenticationService.regNumbers!.forEach(veh => {
        this.regNumbers?.push(veh.registrationNumber)
      });
    }
    this.filteredRegNumbers = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  control = new FormControl();
  regNumbers: string[] | null = [];
  filteredRegNumbers!: Observable<string[]>;
  registrationNumberForTheReservation: string | null = null;
  showReservationInfoMessage = false;
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.regNumbers!.filter((regNumber) =>
      this._normalizeValue(regNumber).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  clickedOutsideInput() {
    this.showReservationInfoMessage = true;
  }
}
