// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DateServices {
//   today!: Date;

//   avaliableYears: number[] = [];
//   avaliableMonths: number[] = [];
//   avaliableDays: number[] = [];

//   avaliableYearsForEnd: number[] = [];
//   avaliableMonthsForEnd: number[] = [];
//   avaliableDaysForEnd: number[] = [];

//   startReservationHour!: number | null;
//   constructor() {
//     this.today = new Date();
//     /// this.today = new Date(2023, 0, 30)
//     this.getAvaliableYears(this.today);
//   }
//   onChangeYear(year: number) {
//     this.today = new Date();
//     this.getAvaliableMonths(year);
//   }
//   onChangeMonth(year: number, month: number) {
//     this.today = new Date();
//     this.getAvaliableDays(month, year);
//   }

//   getDaysCountInCurrMonth(date: Date) {
//     let count = 0;
//     for (let i = 1; i < 32; i++) {
//       if (
//         new Date(date.getFullYear(), date.getMonth(), i).getMonth() ===
//         date.getMonth()
//       ) {
//         count++;
//       }
//     }
//     return count;
//   }
//   getAvaliableYears(date: Date) {
//     if (this.today.getMonth() + 1 === 12 && this.today.getDay() >= 30) {
//       this.avaliableYears = [this.today.getFullYear() + 1];
//     } else {
//       this.avaliableYears = [
//         this.today.getFullYear(),
//         this.today.getFullYear() + 1,
//       ];
//     }
//   }
//   getAvaliableMonths(year: number) {
//     this.avaliableMonths = [];

//     if (year == this.today.getFullYear()) {
//       // console.log('YESSS ');
//       if (this.today.getMonth() < 11) {
//         if (
//           this.today.getDate() + 2 <=
//           this.getDaysCountInCurrMonth(this.today)
//         ) {
//           this.avaliableMonths.push(this.today.getMonth() + 1);
//         }
//         for (let i = this.today.getMonth() + 2; i <= 12; i++) {
//           this.avaliableMonths.push(i);
//         }
//       } else {
//         if (this.today.getDate() + 2 <= 31) {
//           this.avaliableMonths = [12];
//         } else {
//           this.avaliableMonths = [];
//         }
//       }
//     } else {
//       // if(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+ 2).getMonth() == this.today.getMonth()){
//       for (let i = 1; i <= this.today.getMonth() + 1; i++) {
//         this.avaliableMonths.push(i);
//         //     }
//         //  }else{
//         // for (let i = 1; i <= this.today.getMonth()+2; i++) {
//         //     this.avaliableMonths.push(i);
//         // }
//       }
//     }
//     //  }, 700)
//   }

//   getAvaliableDays(month: number, year: number) {
//     // console.log('MONTH, YEAR', month, year, this.today.getMonth());
//     this.avaliableDays = [];
//     //  setTimeout(()=>{
//     if (year == this.today.getFullYear()) {
//       // console.log('here', month, this.today.getMonth());
//       if (month == this.today.getMonth() + 1) {
//         // console.log('FIRST IF', month, this.today.getMonth());
//         for (
//           let i = this.today.getDate();
//           i < this.getDaysCountInCurrMonth(this.today);
//           i++
//         ) {
//           // console.log('I? ', i);
//           if (i + 2 <= this.getDaysCountInCurrMonth(this.today)) {
//             this.avaliableDays.push(i + 2);
//           }
//         }
//       } else {
//         for (
//           let i = 1;
//           i <= this.getDaysCountInCurrMonth(new Date(year, month - 1, 1));
//           i++
//         ) {
//           this.avaliableDays.push(i);
//         }
//       }
//     } else {
//       if (month == this.today.getMonth() + 1) {
//         for (let i = 1; i <= this.today.getDate(); i++) {
//           this.avaliableDays.push(i);
//         }
//       } else {
//         for (
//           let i = 1;
//           i <= this.getDaysCountInCurrMonth(new Date(year, month - 1, 1));
//           i++
//         ) {
//           this.avaliableDays.push(i);
//         }
//       }
//       //console.log('HEREEEE: ', this.getDaysCountInCurrMonth(new Date(year, month-1, 1)))
//     }
//     // console.log('AVdays', this.avaliableDays);
//     //  },500)
//   }

//   getAvaliableYearsForEndOfReservation(date: Date) {
//     this.avaliableYearsForEnd = [date.getFullYear()];
//     if (
//       new Date(
//         date.getFullYear(),
//         date.getMonth() + 1,
//         date.getDate()
//       ).getFullYear() ==
//       date.getFullYear() + 1
//     ) {
//       this.avaliableYearsForEnd.push(date.getFullYear() + 1);
//     }
//   }

//   getAvaliableMonthsForEndOfReservation(date: Date) {
//     console.log('startReservationHour', this.startReservationHour);
//     if (this.getDaysCountInCurrMonth(date) == date.getDate()) {
//       if (this.startReservationHour && this.startReservationHour > 21) {
//         this.avaliableMonthsForEnd = [date.getMonth() + 2];
//       } else {
//         this.avaliableMonthsForEnd = [date.getMonth() + 1, date.getMonth() + 2];
//       }
//     } else {
//       this.avaliableMonthsForEnd = [date.getMonth() + 1, date.getMonth() + 2];
//     }
//   }
//   getAvaliableDaysForEndOfReservation(date: Date, month: number, hour: number) {
//     this.avaliableDaysForEnd = [];
//     if (month == date.getMonth() + 1) {
//       if (hour <= 21) {
//         this.avaliableDaysForEnd.push(date.getDate());
//       }
//       if (date.getDate() < this.getDaysCountInCurrMonth(date)) {
//         for (
//           let i = date.getDate();
//           i <= this.getDaysCountInCurrMonth(date);
//           i++
//         ) {
//           if (i > date.getDate()) {
//             this.avaliableDaysForEnd.push(i);
//           }
//         }
//       }
//     } else {
//       for (let i = 1; i <= date.getDate(); i++) {
//         this.avaliableDaysForEnd.push(i);
//       }
//     }
//   }
//   timeArray: string[] = [
//     '00',
//     '01',
//     '02',
//     '03',
//     '04',
//     '05',
//     '06',
//     '07',
//     '08',
//     '09',
//     '10',
//     '11',
//     '12',
//     '13',
//     '14',
//     '15',
//     '16',
//     '17',
//     '18',
//     '19',
//     '20',
//     '21',
//     '22',
//     '23',
//   ];
//   getAvaliableHoursForEndOfReservation(startDate: Date, endDate: Date) {
//     let array: string[] = [];
//     // console.log('startDate', startDate);
//     // console.log('endDate', endDate);
//     if (
//       startDate?.getFullYear() == endDate?.getFullYear() &&
//       startDate?.getMonth() == endDate?.getMonth() &&
//       startDate?.getDate() == endDate?.getDate()
//     ) {
//       // console.log('EQUAL');
//       for (
//         let i = this.startReservationHour! + 2;
//         i < this.timeArray.length;
//         i++
//       ) {
//         array.push(this.timeArray[i]);
//       }
//       return array;
//     }
//     return this.timeArray;
//   }
// }
