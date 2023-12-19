import { Injectable } from '@angular/core';
// import { DateServices } from './date-services';
// import { TimePickerService } from '../shared/time-picker.service';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  public endPeriodTime!: Date;
  public startPeriodTime!: Date;
  constructor( ) { }
}
