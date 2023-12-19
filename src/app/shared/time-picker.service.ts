import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TimePickerService {
  pickerForStartOpened = false;

  timeForStartPeriod: Date| null = null;
  timeForEndPeriod: Date| null = null;

  singleTime: Date| null = null;

  endPeriodTimeIsSelected:boolean = false;

  constructor() {}
}
