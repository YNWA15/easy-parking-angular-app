import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TimePickerService } from '../time-picker.service';
import { DatePickerService } from '../date-picker.service';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {
  @Output() close = new EventEmitter();
  @Output()('onTimeChange') onTimeChange = new EventEmitter();
  @Input() startReservation = false;
  @Input() isInReserveNowMode = false;
  @Output() onEndPeriodTimeSelected = new EventEmitter();

  auto = true;
  hhmm = 'hh';
  ampm = 'am';
  dial: any = [];
  hour = '12';
  minute = '00';

  private date = new Date();
  private onChange = (v: Date) => { };
  private onTouched = () => { };

  constructor(
    private timePicker: TimePickerService,
    private datePickerService: DatePickerService
  ) {
    const j = 84;
    for (let min = 1; min <= 12; min++) {
      const hh = String(min);
      const mm = String('00' + ((min * 5) % 60)).slice(-2);
      const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
      this.dial.push({ top: j * y + 'px', left: j * x + 'px', hh, mm });
    }
    this.timePicker.singleTime = null;
    this.timePicker.timeForEndPeriod = null;
    this.timePicker.timeForStartPeriod = null;
    this.hour = '00';
    this.minute = '00'

  }
  ngOnInit(): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  public writeValue(v: Date) {
    this.date = v || new Date();
    const hh = this.date.getHours();
    const mm = this.date.getMinutes();
    this.ampm = hh < 12 ? 'am' : 'pm';
    this.hour = String(hh % 12 || 12);
    this.minute = String('00' + (mm - (mm % 5))).slice(-2);
  }

  public registerOnChange = (fn: any) => (this.onChange = fn);

  public registerOnTouched = (fn: any) => (this.onTouched = fn);

  timeChange($event: string) {
    if (this.hhmm === 'hh') {
      this.hour = $event;
      if (this.auto) {
        this.hhmm = 'mm';
      }
    } else {
      this.minute = $event;
    }
  }

  rotateHand() {
    const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
    return `rotate(${deg * 6}deg)`;
  }

  cancel = () => {

    if (!this.isInReserveNowMode) {
      if (this.startReservation) {
        this.timePicker.timeForStartPeriod = null;
        this.datePickerService.dateRangePickerStartDate?.setHours(0)
        this.datePickerService.dateRangePickerStartDate?.setMinutes(0)

      } else {
        this.timePicker.timeForEndPeriod = null;
        this.datePickerService.dateRangePickerEndDate?.setHours(0)
        this.datePickerService.dateRangePickerEndDate?.setMinutes(0)
      }
    } else {
      this.timePicker.singleTime = null;
      this.datePickerService.datePickerDate?.setHours(0);
      this.datePickerService.datePickerDate?.setMinutes(0);;
    }
    this.hour = '12';
    this.minute = '00';
    this.hhmm = 'hh';
    this.close.emit();
  };

  check(str: string) {
    this.ampm = str;
  }
  ok() {
    let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    if ((this.ampm === 'am' && hh === 12) || hh === 24) {
      hh -= 12;
    }
    this.date.setHours(hh);
    this.date.setMinutes(+this.minute);
    this.onChange(this.date);
    this.onTimeChange.emit();
    this.close.emit();
    if (!this.isInReserveNowMode) {
      if (this.startReservation) {
        this.timePicker.timeForStartPeriod = this.date;
        this.datePickerService.dateRangePickerStartDate?.setHours(this.timePicker.timeForStartPeriod.getHours())
        this.datePickerService.dateRangePickerStartDate?.setMinutes(this.timePicker.timeForStartPeriod.getMinutes())
      } else {
        this.timePicker.timeForEndPeriod = this.date;
        this.datePickerService.dateRangePickerEndDate?.setHours(this.timePicker.timeForEndPeriod.getHours())
        this.datePickerService.dateRangePickerEndDate?.setMinutes(this.timePicker.timeForEndPeriod.getMinutes())
        this.onEndPeriodTimeSelected.emit()
      }
    } else {
      this.timePicker.singleTime = this.date
      this.datePickerService.datePickerDate?.setHours(this.date.getHours());
      this.datePickerService.datePickerDate?.setMinutes(this.date.getMinutes());
    }
    this.hhmm = 'hh';
  }
}
