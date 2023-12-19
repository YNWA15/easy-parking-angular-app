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
  isReserveFromNow: boolean = true;
  carRegNumber!: string;
  constructor(private http: HttpClient) { }

  getUserNotEndedReservations(userId: number): Observable<any> {

    let url = 'https://localhost:44351/userNotEndedReservations/' + userId;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getReservationByID(id: number): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }
  postReservation(parkingId: number, spotId: number, startDate: Date, endDate: Date, userId: number, regNumber: string): Observable<any> {
    let url = 'https://localhost:44351/api/reservations';
    let body = { "startReservationPeriod": startDate, "endReservationPeriod": endDate, "parkingId": parkingId, "spotId": spotId, "userId": userId, "carRegNumber": regNumber };
    return (<any>this.http.post(url, body)) as Observable<any>;
  }
  postReservationFromNow(parkingId: number, spotId: number, endDate: Date, userId: number, regNumber: string): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/fromNow';
    let body = { "endReservationPeriod": endDate, "parkingId": parkingId, "spotId": spotId, "userId": userId, "carRegNumber": regNumber };
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
  removeAllCreditsFromUser(userId: number): Observable<any> {
    let url = 'https://localhost:44351/api/users/removeAllCredits/' + userId;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }

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

  changeReservationCarNumber(reservationId: number, newNumber: string): Observable<any> {
    let url = 'https://localhost:44351/updateReservationCarNumber/' + reservationId + '/' + newNumber;
    return (<any>this.http.put(url, {})) as Observable<any>;
  }

  endReservation(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/endReservation/' + reservationId;
    return (<any>this.http.put(url, null)) as Observable<any>;
  }

  deleteReservation(reservationId: number): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/' + reservationId;
    return (<any>this.http.delete(url)) as Observable<any>;
  }

  correctStringValue(value: any, isMonth: boolean = false) {
    if (!isMonth) {
      if (value.toString().length > 1) {
        return value.toString();
      } else {
        return '0' + value.toString();
      }
    } else if (isMonth == true) {
      if (+value < 9) {
        return '0' + (+value + 1).toString();
      } else {
        return (+value + 1).toString();
      }
    }
  }

  cancelReservation(reservationId: number) {
    let url = 'https://localhost:44351/api/reservations/cancelReservation/' + reservationId;
    return (<any>this.http.delete(url)) as Observable<any>;
  }
}
