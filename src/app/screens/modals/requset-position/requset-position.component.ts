import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GeolocationServices } from 'src/app/services/geolocation-services';

@Component({
  selector: 'app-requset-position',
  templateUrl: './requset-position.component.html',
  styleUrls: ['./requset-position.component.css'],
})
export class RequsetPositionComponent implements OnInit {
  userLat: number = 0;
  userLon: number = 0;
  permission!: boolean;
  p!: any;
  geoInterval!: any;

  constructor(
    public modalRef: MdbModalRef<RequsetPositionComponent>,
    public geolocationService: GeolocationServices,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.permission == this.geolocationService.permission;
    console.log(this.permission);
  }
  onNo() {
    this.modalRef?.close();
    this.router.navigate(['/parkings']);
  }
  onClose() {
    this.modalRef?.close();
  }
  onSubmit() {
    this.modalRef?.close();
    this.geolocationService.getLoc().subscribe((x) => {
      if (x) {
        this.geolocationService.watchPosition();
        this.geolocationService.handlePermission();
        this.router.navigate(['/parkings']);
      }
    });
  }

  handlePermission(permission: boolean): boolean {
    if (navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            permission = true;
          } else {
            permission = false;
          }
        });
    }
    return permission;
  }

  watchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userLon = position.coords.longitude;
      });
    }
  }
}
