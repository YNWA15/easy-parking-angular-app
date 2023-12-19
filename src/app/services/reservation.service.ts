import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  selectedPeriod = false;
  currentReservation: Reservation | null = null;
  isReserveFromNow :boolean = true;
  carRegNumber!: string;
  constructor(private http: HttpClient) {}

  // checkIfPeriodIsAvaliableInAParking(
  //   parkingId: number,
  //   startPeriodTime: Date,
  //   endPeriodTime: Date
  // ) {
  //   ////  this.http.
  // }
  // checkIfPeriodIsAvaliableInAParkingFromNow(
  //   parkingId: number,
  //   //startPeriodTime: Date,
  //   endPeriodTime: Date
  // ) {
  //   ////  this.http.
  // }

  // getAllReservations(): Observable<any> {
  //   let url = 'https://localhost:44351/api/reservations';
  //   return (<any>this.http.get(url)) as Observable<any>;
  // }




  // getUserReservations(userId: number): Observable<any> {
    
  //   let url = 'https://localhost:44351/userReservations/' + userId;
  //   return (<any>this.http.get(url)) as Observable<any>;
  // }
  getUserNotEndedReservations(userId: number): Observable<any> {
    
    let url = 'https://localhost:44351/userNotEndedReservations/' + userId;
    return (<any>this.http.get(url)) as Observable<any>;
  }
  // getAllReservationsWithoutFullInfo(): Observable<any> {
  //   let url = 'https://localhost:44351/withoutFullInfo';
  //   return (<any>this.http.get(url)) as Observable<any>;
  // }
  getReservationByID(id: number): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }
  postReservation(parkingId: number, spotId:number, startDate: Date, endDate: Date, userId: number, regNumber: string): Observable<any> {
    let url = 'https://localhost:44351/api/reservations';
    // debugger
    let body = {"startReservationPeriod": startDate, "endReservationPeriod": endDate, "parkingId": parkingId, "spotId": spotId, "userId": userId, "carRegNumber": regNumber};
    // console.log(body)
    return (<any>this.http.post(url, body)) as Observable<any>;
  }
  postReservationFromNow(parkingId: number, spotId:number, endDate: Date, userId: number, regNumber: string): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/fromNow';
    // debugger
    // console.log(endDate);
    // console.log(new Date (endDate));
    // console.log(endDate.toString());
    // console.log(endDate.toLocaleString())
    // console.log(new Date(endDate.toLocaleString()));
    let body = { "endReservationPeriod": endDate, "parkingId": parkingId, "spotId": spotId, "userId": userId, "carRegNumber": regNumber};
    // console.log(body)
    return (<any>this.http.post(url, body)) as Observable<any>;
  }


  removeCreditsFromUserForReservation(userId: number, amaunt: number): Observable<any> {
    let url = 'https://localhost:44351/api/users/removeCredits/' + userId + '/' + amaunt;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
  

  payReservation(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/pay/' + reservationId;
    return (<any>this.http.post(url, {})) as Observable<any>;
  }
  startReservation(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/startReservation/' + reservationId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
  removeAllCreditsFromUser(userId:number): Observable<any> {
    let url = 'https://localhost:44351/api/users/removeAllCredits/' + userId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }

  // tryChangeReservationPeriod(reservationId: number, newStartDate: Date, newEndDate: Date): Observable<any> {  /// not used
  //   let url =
  //     `https://localhost:44351/tryUpdateReservationPeriod/${reservationId}/${newStartDate!.getFullYear().toString()}-${this.correctStringValue(newStartDate.getMonth(), true)}-${this.correctStringValue(newStartDate.getDate())}T${this.correctStringValue(newStartDate!.getHours().toString())}%3A${this.correctStringValue(newStartDate!.getMinutes().toString()).toString()}%3A00/${newEndDate!.getFullYear().toString()}-${this.correctStringValue(newEndDate.getMonth(), true)}-${this.correctStringValue(newEndDate.getDate())}T${this.correctStringValue(newEndDate!.getHours().toString())}%3A${this.correctStringValue(newEndDate!.getMinutes().toString()).toString()}%3A00`
     
  //   // let url = 'https://localhost:44351/tryUpdateReservationPeriod/' + reservationId +'/'
  //   // +
  //   // newStartDate!.getFullYear().toString() +
  //   // '-' +
  //   // this.correctStringValue(newStartDate.getMonth(), true) +
  //   // '-' +
  //   // this.correctStringValue(newStartDate.getDate()) +
  //   // 'T' +
  //   // this.correctStringValue(newStartDate!.getHours().toString()) +
  //   // '%3A' +
  //   // this.correctStringValue(newStartDate!.getMinutes().toString()).toString() +
  //   // '%3A00/' +
  //   // newEndDate!.getFullYear().toString() +
  //   // '-' +
  //   // this.correctStringValue(newEndDate.getMonth(), true) +
  //   // '-' +
  //   // this.correctStringValue(newEndDate.getDate()) +
  //   // 'T' +
  //   // this.correctStringValue(newEndDate!.getHours().toString()) +
  //   // '%3A' +
  //   // this.correctStringValue(newEndDate!.getMinutes().toString()).toString() +
  //   // '%3A' +
  //   // '00';

  //   return (<any>this.http.get(url)) as Observable<any>;
  // }

  //https://localhost:44351/updateReservationPeriodWithoutChangeSpot/61/2023-07-28T20%3A46%3A35.456/2023-07-28T22%3A46%3A35.456/12

  // changeReservationPeriodWithoutChangeSpot(reservationId: number, newStartDate: Date, newEndDate: Date, newPrice: number): Observable<any> {  // not used
  //   let url = 'https://localhost:44351/updateReservationPeriodWithoutChangeSpot/' + reservationId +'/'
  //   +
  //   newStartDate!.getFullYear().toString() +
  //   '-' +
  //   this.correctStringValue(newStartDate.getMonth(), true) +
  //   '-' +
  //   this.correctStringValue(newStartDate.getDate()) +
  //   'T' +
  //   this.correctStringValue(newStartDate!.getHours().toString()) +
  //   '%3A' +
  //   this.correctStringValue(newStartDate!.getMinutes().toString()).toString() +
  //   '%3A00/' +
  //   newEndDate!.getFullYear().toString() +
  //   '-' +
  //   this.correctStringValue(newEndDate.getMonth(), true) +
  //   '-' +
  //   this.correctStringValue(newEndDate.getDate()) +
  //   'T' +
  //   this.correctStringValue(newEndDate!.getHours().toString()) +
  //   '%3A' +
  //   this.correctStringValue(newEndDate!.getMinutes().toString()).toString() +
  //   '%3A' +
  //   '00/' + newPrice;

  //   return (<any>this.http.put(url, {})) as Observable<any>;
  // }

  //https://localhost:44351/updateReservationPeriodAndChangeSpot/61/2023-07-28T20%3A46%3A35.456/2023-07-28T22%3A46%3A35.456/1/12

  // changeReservationPeriodAndChangeSpot(reservationId: number, newStartDate: Date, newEndDate: Date, newSpotId:number , newPrice: number): Observable<any> {
  //   let url = 'https://localhost:44351/updateReservationPeriodWithoutChangeSpot/' + reservationId +'/'   //not used 
  //   +
  //   newStartDate!.getFullYear().toString() +
  //   '-' +
  //   this.correctStringValue(newStartDate.getMonth(), true) +
  //   '-' +
  //   this.correctStringValue(newStartDate.getDate()) +
  //   'T' +
  //   this.correctStringValue(newStartDate!.getHours().toString()) +
  //   '%3A' +
  //   this.correctStringValue(newStartDate!.getMinutes().toString()).toString() +
  //   '%3A00/' +
  //   newEndDate!.getFullYear().toString() +
  //   '-' +
  //   this.correctStringValue(newEndDate.getMonth(), true) +
  //   '-' +
  //   this.correctStringValue(newEndDate.getDate()) +
  //   'T' +
  //   this.correctStringValue(newEndDate!.getHours().toString()) +
  //   '%3A' +
  //   this.correctStringValue(newEndDate!.getMinutes().toString()).toString() +
  //   '%3A' +
  //   '00/' + newSpotId + '/' + newPrice;

  //   return (<any>this.http.put(url, {})) as Observable<any>;
  // }
  checkIfPossibleAddOneHourToReservation(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/checkIfPossibleAddOneHourToReservation/' + reservationId;
    return (<any>this.http.get(url)) as Observable<any>;
  }
 AddOneHourToReservationWithoutChangeSpot(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/addOneHourToReservationWithoutChangeSpot/' + reservationId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
  AddOneHourToReservationAndChangeSpot(reservationId: number, newSpotId: number): Observable<any> {
    let url = 'https://localhost:44351/addOneHourToReservationWithoutChangeSpot/' + reservationId + '/' + newSpotId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
 


  changeReservationCarNumber(reservationId: number, newNumber: string): Observable<any>{
    let url = 'https://localhost:44351/updateReservationCarNumber/' + reservationId + '/' + newNumber;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }
  endReservation(reservationId: number): Observable<any>{
    let url = 'https://localhost:44351/endReservation/' + reservationId;
    return (<any>this.http.put(url, null)) as Observable<any>;
  }
  deleteReservation(reservationId: number): Observable<any>{ 
    // debugger
    let url = 'https://localhost:44351/api/reservations/' + reservationId;
    return (<any>this.http.delete(url)) as Observable<any>;
  }

  correctStringValue(value: any, isMonth: boolean = false) {
    // console.log('value:', value);
    if (!isMonth) {
      if (value.toString().length > 1) {
        return value.toString();
      } else {
        // console.log('return  value:', value);
        return '0' + value.toString();
      }
    } else if (isMonth == true) {
      if (+value < 9) {
        // console.log('return month value:', JSON.stringify(value));
        return '0' + (+value + 1).toString();
      } else {
        return (+value + 1).toString();
      }
    }
  }

  cancelReservation(reservationId: number){
    let url = 'https://localhost:44351/api/reservations/cancelReservation/' + reservationId;
    return (<any>this.http.delete(url)) as Observable<any>;
  }
}
