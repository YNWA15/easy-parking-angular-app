import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  public endPeriodTime!: Date;
  public startPeriodTime!: Date;
  constructor() { }
}
