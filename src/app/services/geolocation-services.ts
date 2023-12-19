import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationServices {
  userLat: number | null = null;
  userLon: number | null = null;
  permission!: any;
  resultState: string = '';
  denied: boolean = false;

  constructor() {
    setInterval(()=> {
      if (navigator.permissions.query) {
        let a = true;
        let state: string;
        navigator.permissions
          .query({ name: 'geolocation' })
          .then(function (result) {
            state = result.state;
          });
        setTimeout(() => {
          this.resultState = state!;
          if (this.resultState === 'prompt') {
            a = false;
            state = 'prompt';
          } else if (this.resultState === 'denied') {
            state = 'denied';
            a = false;
          } else if (this.resultState === 'granted') {
            state = 'granted';
            a = true;
          }
        }, 250);
      }
    }, 2000)
  }
  try() {
    if (this.resultState === 'granted') {
      this.watchPosition();
    } else if (this.resultState === 'prompt') {
    } else if (this.resultState === 'denied') {
      this.denied = true;
    }
  }
  getLoc(): Observable<any> {
    return Observable.create((observer: any) => {
      if (navigator.geolocation) {
        // debugger
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            this.userLat = position.coords.latitude;
            this.userLon = position.coords.longitude;
            observer.next(position);
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            if (error.message.toString().includes('denied')) {
              this.denied = true;
            }
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  }
  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: any) => {
  //         if (position) {
  //           this.permission = true;
  //           this.userLat = position.coords.latitude;
  //           this.userLon = position.coords.longitude;
  //         } else {
  //           this.permission = false;
  //         }
  //       },
  //       (error: GeolocationPositionError) => {
  //         if (error.message.toString().includes('denied')) {
  //           this.denied = true;
  //         }
  //       }
  //     );
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //   }
  // }
  handlePermission(): boolean {
    let permission = false;
    if (navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            permission = true;
          }
        });
    }
    this.permission = permission;
    console.log('THIS PERMISSION L: ', this.permission, permission);
    return permission;
  }

  watchPosition() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this.userLat = position.coords.latitude;
          this.userLon = position.coords.longitude;
        },
        () => {},
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
      );
      setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.userLat = position.coords.latitude;
          this.userLon = position.coords.longitude;
        });
      }, 500);
    }
  }
}
