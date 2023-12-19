import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'angular-modal-simple';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GeolocationServices } from './services/geolocation-services';
import { AuthenticationServices } from './services/authentication-services';
import { TimePickerService } from './shared/time-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isWelcomePage: boolean = false;

  constructor(
    private url: LocationStrategy,
    private modalService: ModalService,
    private modalDbService: MdbModalService,
    private geolocationService: GeolocationServices,
    private authService: AuthenticationServices,
    private timePickerService: TimePickerService,
    private router: Router
  ) {}

  modalRef: MdbModalRef<WelcomeComponent> | null = null;

  openModal() {
    this.modalRef = this.modalDbService.open(WelcomeComponent);
  }
  ngOnInit(): void {
    if (this.url.path().includes('welcome')) {
      this.isWelcomePage = true;
    }
    //this.displayTest();
    setInterval(() => {
      this.geolocationService.try();
    }, 1000);
    let lastTimeLogged = localStorage.getItem('timeLogged');
    if(lastTimeLogged) {
      let dateLastTimeLogged = new Date(lastTimeLogged);
      if( new Date(dateLastTimeLogged.setMinutes(dateLastTimeLogged.getMinutes() + 20)) > (new Date())){
        debugger
        this.authService.isLogged = true;
        localStorage.setItem('timeLogged', new Date().toString());
        this.authService.getUserByEmail(localStorage.getItem('email')!).subscribe(x=>{
         // debugger
          this.authService.loggedUser = x;
          this.authService.userId = x.id;
          if(localStorage.getItem('email') && localStorage.getItem('email')!.includes('admin')){
            this.authService.isEmployee = true;
            let a : string = localStorage.getItem('email')!.toString();
            a.replace('admin', '').toString();
            a.replace('@test', '').toString();
            this.authService.emplyeeParkingId = +a;
            this.router.navigate(['portal']);
          } else {
            this.authService.isEmployee = false;
          }
        })
      }
    }
  }
  displayTest(): void {
    this.modalService.display(WelcomeComponent);
  }
  endPeriodTimeSelected(){
    this.timePickerService.endPeriodTimeIsSelected = true;
  }
}
