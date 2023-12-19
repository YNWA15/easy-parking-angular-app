import {
  AfterViewInit,
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
import { ModalService } from 'angular-modal-simple';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { map, Observable, startWith } from 'rxjs';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { TimePickerService } from 'src/app/shared/time-picker.service';
import { TimePickerComponent } from 'src/app/shared/time-picker/time-picker.component';
import { RulesForUsingTheAppComponent } from '../rules-for-using-the-app/rules-for-using-the-app.component';
// import { ShowAvaliableParkingsForPeriodComponent } from '../show-avaliable-parkings-for-period/show-avaliable-parkings-for-period.component';
import { AuthenticationServices } from 'src/app/services/authentication-services';
import { ParkingServices } from 'src/app/services/parkings-services';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';

// import { NgbDateParserFormatter, NgbDatepicker, NgbDateStruct, NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap';
// import {DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';
// import { DateServices } from 'src/app/services/date-services';
// import * as moment from 'moment';

//import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.css'],
})
export class PeriodPickerComponent implements OnInit, AfterViewInit {


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
  // public minDate: Date = new Date(
  //   this.currentYear,
  //   this.currentMonth,
  //   7,
  //   0,
  //   0,
  //   0
  // );
  // public maxDate: Date = new Date(
  //   this.currentYear,
  //   this.currentMonth,
  //   27,
  //   this.currentHour,
  //   this.currentMinute,
  //   this.currentSecond
  // );
  showTimepicker = false;

  //public modalRef: MdbModalRef<PeriodPickerComponent>| null = null
  ////modalRef: MdbModalRef<WelcomeComponent> | null = null;
  @Input() element!: MdbModalRef<PeriodPickerComponent>;
  @Input() isInEditMode: boolean = false;
  @ViewChild('timePicker') timePicker!: ElementRef<TimePickerComponent>;

  constructor(
    //public modalRef: MdbModalRef<PeriodPickerComponent>,
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
  
  startTimePicker = false;
  cancel(){
    //debugger
    this.element.close();
  }
  modalRef!:MdbModalRef<any>;
  openPickerStart() {
    //this.modalService.display
    this.modalRef = this.modalDbService.open(TimePickerComponent, {
      modalClass: 'timePickerModal',
    });
    this.startTimePicker = true;
    this.timePickerService.pickerForStartOpened = true;
  }
  openPickerEnd() {
    //this.modalService.display
    this.modalRef = this.modalDbService.open(TimePickerComponent, {
      modalClass: 'timePickerModal',
    });
    this.startTimePicker = false;
    // timePicker =
    // setTimeout(()=>{
    this.timePickerService.pickerForStartOpened = false;
    //})
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
  error: string | null = null;
  errorPeriod(){
    // console.log(this.datePickerService.dateRangePickerStartDate)
    // console.log(this.datePickerService.dateRangePickerEndDate)
    let a = new Date(this.datePickerService.dateRangePickerEndDate!);
    let b = new Date(this.datePickerService.dateRangePickerStartDate!)
     if( b < new Date(new Date().setHours(new Date().getHours() + 2))){
    //  if(new Date() < new Date(new Date().setHours(new Date().getHours() + 2))){
      this.error = 'Start of the period should be at least two hours after now.'
      return true;
    } else if (this.datePickerService.dateRangePickerStartDate! > new Date( a.setHours(-1))){
      this.error = 'The period must be at least 1 hour';
      return true;
    } else {
      this.error = null;
      return false;
    }
  }
  ngAfterViewInit(): void {
    let b = document.getElementsByClassName(
      'mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base'
    )[0];
    b.addEventListener('click', function (event) {
      // console.log('CLICKED CALENDAR BTN');
      let a = document.getElementsByTagName('mat-month-view');
      // console.log(a);
      setTimeout(() => {
        const buttons = Array.from(
          document.getElementsByClassName('mat-calendar-body-cell')
        );
        // console.log('buttons', buttons);
        buttons.forEach((btn) => {
          btn.addEventListener('click', function (event) {
            // console.log('111');
          });
          //  btn?.setAttribute('disabled', '')
          btn.addEventListener('click', function handleClick(event) {
            // console.log('button clicked');
            // console.log(event);
            // console.log(event.target);
          });
        });
      }, 500);

      // setTimeout(()=>{
      //   console.log('a1: ', a[1].eventListeners)
      // },500)
    });
    // button?.addEventListener('click', function handleClick(event) {
    //   console.log('button clicked');
    //   console.log(event);
    //   console.log(event.target);
    // });
    let a = document.getElementsByTagName('mat-month-view');
    // console.log('a: ', a);
  }
  showTimePicker = false;
  showTimePickerForStart: boolean = false;
  showTimePickerForEnd: boolean = false;

  onRangeSelected() {
    this.showTimePickerForStart = true;
    this.showTimePickerForEnd = true;
    // this.endReservation 
  }
  try() {
    //  c
  }
  //modalRef: MdbModalRef<WelcomeComponent> | null = null;
  @Output() onSubmitPeriodInEditMetod = new EventEmitter();
  onSubmit() {
    // debugger
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
    if(!this.isInEditMode){
      
    this.reservationService.selectedPeriod = true;
    this.parkingService.isSelectedPeriod = true;
    this.reservationService.carRegNumber = this.registrationNumberForTheReservation!;
    this.cancel();
    this.router.navigate(['/parkings']);
    } else {
      this.onSubmitPeriodInEditMetod.emit()
      //this.cancel();
     // this.reservationService.tryChangeReservationPeriod()

    }
   

  }
  endDateRangeChange() {
    // this.startReservation = new Date(this.range.controls.start.value!);
    // this.endReservation = new Date(this.range.controls.end.value!);
    // console.log('CHANGEE')
  }
  startDateRangeChange() {
    // if(this.startReservation && this.startReservation < new Date()){
    //   this.startReservation = null
    // }
  }
  dateInput() {
    // console.log('here1');
    if (this.startReservation && this.startReservation < new Date()) {
      // console.log('here2');
      this.startReservation = null;
      this.endReservation = null;
    }
  }
  onSelectStartHour() {
    this.startReservation!.setHours(this.startReservationHour);
  }
  onSelectEndHour() {
    this.endReservation!.setHours(this.endReservationHour);
    // console.log('range : ', this.startReservation, this.endReservation);
  }
  disabledStartHourSelect() {
    // if(!this.range.controls.start.value || !this.range.controls.end.value){
    //   return false;
    // }
    // return true;
    if (!this.startReservation || !this.endReservation) {
      return false;
    }
    return true;
  }
  onFormSubmit() {}
  checkIfValidStartDate() {
    return null;
  }
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    //const from = this.dateRangeForm ;//&&
    let from = this.dateRangeForm.controls.fromDate.value;
    if (
      new Date(new Date(from).setHours(new Date(from).getHours() - 48)) <
      new Date()
    ) {
      return null;
    }
    ///const to = this.dateRangeForm && this.dateRangeForm.get("toDate").value;
    //   if (from && to) {
    //     invalid = new Date(from).valueOf() + 1000*3600*24*30 < new Date(to).valueOf()  //checking if date difference is less than 31 days
    // }
    //   return invalid ? { invalidRange: { from, to } } : null;
    return {};
  };

  ngOnInit(): void {
    // this.startReservation = new Date();
    //this.endReservation = 'INVALID DATE'
    setTimeout(() => {
      // console.log('RANGE: ', this.range);
    }, 5000);
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', [Validators.required]), //, this.dateRangeValidator]),
      end: new FormControl('', Validators.required),
    });


    //this.regNumbers = this.authenticationService.regNumbers!;
    if(this.authenticationService.regNumbers! && this.authenticationService.regNumbers!.length>0){
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
  regNumbers: string[] | null = []; // = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
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
