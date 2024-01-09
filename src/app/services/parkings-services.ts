import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking, ParkingSpot } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ParkingServices {
  selectedParking: Parking | null = null;
  avaliableParkingsFromDate: Date | null = null;
  avaliableParkingsToDate: Date | null = null;
  currParkingAvSpots: ParkingSpot[] | null = null;

  constructor(private http: HttpClient) { }
  isSelectedPeriod: boolean = false;
  apiUrl: string = 'https://localhost:44351/api/';

  getAllParkings(): Observable<Parking[]> {
    if (!this.isSelectedPeriod) {
      return this.http.get<Parking[]>(this.apiUrl + 'parkings');
    } else {
      return this.getAvaliableParkingsForCustomPeriod();
    }
  }
  getParkingInfo(id: number) {
    let url = 'https://localhost:44351/api/parkings/parkingInfo/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getAvaliableParkingsForCustomPeriod(): Observable<any> {
    let startDate = this.avaliableParkingsFromDate!;
    let endDate = this.avaliableParkingsToDate!;

    let url = `https://localhost:44351/api/parkings/check/
    ${startDate!.getFullYear().toString()}-${this.correctStringValue(startDate.getMonth(), true)}-
    ${this.correctStringValue(startDate.getDate())}
    T${this.correctStringValue(startDate!.getHours().toString())}%3A
    ${this.correctStringValue(startDate!.getMinutes().toString()).toString()}%3A00/
    ${endDate.getFullYear().toString()}-${this.correctStringValue(endDate.getMonth().toString(), true)}
    -${this.correctStringValue(endDate.getDate().toString())}T
    ${this.correctStringValue(endDate.getHours().toString())}%3A
    ${this.correctStringValue(endDate.getMinutes().toString())}%3A00/`

    return (<any>this.http.get(url)) as Observable<any>;
  }
  getAvaliableSpotsInAParkingForCustomPeriod(parkingId: number): Observable<any> {
    let startDate = this.avaliableParkingsFromDate!;
    let endDate = this.avaliableParkingsToDate!;
    let url = `https://localhost:44351/api/reservations/${parkingId}/${startDate!.getFullYear().toString()}-${this.correctStringValue(startDate.getMonth(), true)}-${this.correctStringValue(startDate.getDate())}` +
      `T${this.correctStringValue(startDate!.getHours().toString())}%3A${this.correctStringValue(startDate!.getMinutes().toString()).toString()}%3A00/${endDate!.getFullYear().toString()}-` +
      `${this.correctStringValue(endDate.getMonth(), true)}-${this.correctStringValue(endDate.getDate())}T${this.correctStringValue(endDate!.getHours().toString())}%3A${this.correctStringValue(endDate!.getMinutes().toString()).toString()}%3A00`;
    return (<any>this.http.get(url)) as Observable<any>;
  }
  getAvaliableSpotsInAParkingForCustomPeriodFromNow(parkingId: number, endDate: Date): Observable<any> {
    // let url1 =
    //   'https://localhost:44351/fromNow/' + parkingId + '/' +
    //   endDate!.getFullYear().toString() +
    //   '-' +
    //   this.correctStringValue(endDate.getMonth(), true) +
    //   '-' +
    //   this.correctStringValue(endDate.getDate()) +
    //   'T' +
    //   this.correctStringValue(endDate!.getHours().toString()) +
    //   '%3A' +
    //   this.correctStringValue(endDate!.getMinutes().toString()).toString() +
    //   '%3A00/';


      let url =`https://localhost:44351/fromNow/${parkingId}/${endDate!.getFullYear().toString()}-
      ${this.correctStringValue(endDate.getMonth(), true)}-${this.correctStringValue(endDate.getDate())}T
      ${this.correctStringValue(endDate!.getHours().toString())}%3A${this.correctStringValue(endDate!.getMinutes().toString()).toString()}%3A00/`
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getParkingById(id: number): Observable<any> {
    let url = 'https://localhost:44351/api/parkings/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getParkingFutureReservations(parkingId: number): Observable<any> {
    let url = 'https://localhost:44351/api/reservations/futureReservations/' + parkingId;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getParkingSpotCurretnReservation(spotId: number): Observable<any> {
    let url = 'https://localhost:44351/api/parkingSpots/currentSpotReservation/' + spotId;
    return (<any>this.http.get(url)) as Observable<any>;
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

  getBusySpotsOnParking(parkingId: number): Observable<any> {
    let url = 'https://localhost:44351/api/parkingSpots/busyspots/' + parkingId;
    return (<any>this.http.get(url)) as Observable<any>;
  }
}
