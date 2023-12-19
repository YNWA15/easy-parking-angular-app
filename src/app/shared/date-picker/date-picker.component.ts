import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePickerService } from '../date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent{
  @Input() dateRangePicker: boolean = false;
  @Output() onEndDateRangeChangeEvent = new EventEmitter();
  startReservation: Date | null = null;
  endReservation: Date | null = null;
  dateRangeForm!: FormGroup;
  datePicker: Date | null = null;
  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    public datePickerService: DatePickerService
  ) { 
    this.datePickerService.dateRangePickerStartDate = null;
    this.datePickerService.dateRangePickerEndDate = null;
    this.datePickerService.datePickerDate = null;
  }


  ngOnInit(): void {

    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', [Validators.required]), //, this.dateRangeValidator]),
      end: new FormControl('', Validators.required),
    });

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getTime();
    return (
      day >=
      new Date(new Date().setHours(- 1)).getTime() &&
      day <=
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime()
    );
  };
  onFormSubmit() { }
  startDateRangeChange() {
    // if(this.startReservation && this.startReservation < new Date()){
    //   this.startReservation = null
    // }
  }
  dateInput() {
    // console.log('DateInput');
    if (this.startReservation && this.startReservation < new Date()) {
      // console.log('here2');
      this.startReservation = null;
      this.endReservation = null;
    }
  }
  endDateRangeChange() {
    this.onEndDateRangeChangeEvent.emit();
  }
  datePickerChange() {
  }
}
