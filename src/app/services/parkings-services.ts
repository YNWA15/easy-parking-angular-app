import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking, ParkingInfo, ParkingSpot } from '../models';

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
      // console.log('ALLLL')

      return this.http.get<Parking[]>(this.apiUrl + 'parkings');
    } else {
      // console.log('WITH PERIOD')
      return this.getAvaliableParkingsForCustomPeriod();
    }

  }
  getParkingInfo(id: number) {
    let url = 'https://localhost:44351/api/parkings/parkingInfo/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getAvaliableParkingsForCustomPeriod(): Observable<any> {
    // debugger
    let startDate = this.avaliableParkingsFromDate!;
    let endDate = this.avaliableParkingsToDate!;
    // console.log('endDate', endDate);
    // console.log('startDate', startDate);
    // console.log('month', endDate.getHours());
    // console.log('min', endDate.getMinutes());
    //console.log('startDate', startDate)
   // https://localhost:44351/api/parkings/check/
    //2023-08-25T20%3A47%3A35.456Z/2023-08-26T23%3A47%3A35.456Z
    let url =
      'https://localhost:44351/api/parkings/check/' + //startDate/endDate/parkings?startDate=' +
      startDate!.getFullYear().toString() +
      '-' +
      this.correctStringValue(startDate.getMonth(), true) +
      '-' +
      this.correctStringValue(startDate.getDate()) +
      'T' +
      this.correctStringValue(startDate!.getHours().toString()) +
      '%3A' +
      this.correctStringValue(startDate!.getMinutes().toString()).toString() 
      +
      '%3A00/' +
      endDate.getFullYear().toString() +
      '-' +
      this.correctStringValue(endDate.getMonth().toString(), true) +
      '-' +
      this.correctStringValue(endDate.getDate().toString()) +
      'T' +
      this.correctStringValue(endDate.getHours().toString()) +
      '%3A' +
      this.correctStringValue(endDate.getMinutes().toString())
      +
      '%3A00/';
    // console.log('url: ', url);
    return (<any>this.http.get(url)) as Observable<any>;
    // return [a];
  }
  getAvaliableSpotsInAParkingForCustomPeriod(parkingId: number): Observable<any> {
    let startDate = this.avaliableParkingsFromDate!;
    let endDate = this.avaliableParkingsToDate!;
   // debugger
    let url = `https://localhost:44351/api/reservations/${parkingId}/${startDate!.getFullYear().toString()}-${this.correctStringValue(startDate.getMonth(), true)}-${this.correctStringValue(startDate.getDate())}` +
    `T${this.correctStringValue(startDate!.getHours().toString())}%3A${this.correctStringValue(startDate!.getMinutes().toString()).toString()}%3A00/${endDate!.getFullYear().toString()}-` +
    `${this.correctStringValue(endDate.getMonth(), true)}-${this.correctStringValue(endDate.getDate())}T${this.correctStringValue(endDate!.getHours().toString())}%3A${this.correctStringValue(endDate!.getMinutes().toString()).toString()}%3A00`;
    // let url =
    //   'https://localhost:44351/api/reservations/' + parkingId + '/' +
    //   startDate!.getFullYear().toString() +
    //   '-' +
    //   this.correctStringValue(startDate.getMonth(), true) +
    //   '-' +
    //   this.correctStringValue(startDate.getDate()) +
    //   'T' +
    //   this.correctStringValue(startDate!.getHours().toString()) +
    //   '%3A' +
    //   this.correctStringValue(startDate!.getMinutes().toString()).toString() +
    //   '%3A00/' +
    //   endDate!.getFullYear().toString() +
    //   '-' +
    //   this.correctStringValue(endDate.getMonth(), true) +
    //   '-' +
    //   this.correctStringValue(endDate.getDate()) +
    //   'T' +
    //   this.correctStringValue(endDate!.getHours().toString()) +
    //   '%3A' +
    //   this.correctStringValue(endDate!.getMinutes().toString()).toString() +
    //   '%3A' +
    //   '00';
    return (<any>this.http.get(url)) as Observable<any>;
  }
  getAvaliableSpotsInAParkingForCustomPeriodFromNow(parkingId: number, endDate: Date): Observable<any> {
    let url =
      'https://localhost:44351/fromNow/' + parkingId + '/' +//2023-07-27T10%3A46%3A00
      endDate!.getFullYear().toString() +
      '-' +
      this.correctStringValue(endDate.getMonth(), true) +
      '-' +
      this.correctStringValue(endDate.getDate()) +
      'T' +
      this.correctStringValue(endDate!.getHours().toString()) +
      '%3A' +
      this.correctStringValue(endDate!.getMinutes().toString()).toString() +
      '%3A00/';
    return (<any>this.http.get(url)) as Observable<any>;
  }

  // createParking(parkingName: string, parkingAddress: string, spotsCount: number, latitude: number, longitude: number): Observable<any> {
  //   let url = 'https://localhost:44351/create'
  //   let body = { "name": parkingName, "address": parkingAddress, "spotsCount": spotsCount, "latitude": latitude, "longitude": longitude };
  //   return (<any>this.http.post(url, body)) as Observable<any>;
  
  // }// not need

  getParkingById(id: number): Observable<any> {
    let url = 'https://localhost:44351/api/parkings/' + id;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getParkingFutureReservations(parkingId: number): Observable<any> {
    // debugger
    let url = 'https://localhost:44351/api/reservations/futureReservations/' + parkingId;
    return (<any>this.http.get(url)) as Observable<any>;
  }

  getParkingSpotCurretnReservation(spotId: number): Observable<any> {
    let url = 'https://localhost:44351/api/parkingSpots/currentSpotReservation/' + spotId;
    return (<any>this.http.get(url)) as Observable<any>;
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




  getBusySpotsOnParking(parkingId: number): Observable<any> {
    // debugger
    let url = 'https://localhost:44351/api/parkingSpots/busyspots/' + parkingId;
    return (<any>this.http.get(url)) as Observable<any>;
  }
}
