import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  dateRangePickerStartDate: Date | null = null;
  dateRangePickerEndDate: Date | null = null;

  datePickerDate: Date | null = null;
  constructor() {}
}
