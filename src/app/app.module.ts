import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './screens/navigation-bar/navigation-bar.component';
import { AppRoutingModule } from './app-routing-module';
import { AllParkingsScreenComponent } from './screens/allParkings/all-parkings-screen/all-parkings-screen.component';
import { ParkingComponent } from './screens/allParkings/parkingComponent/parking/parking.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { EmployeePortalComponent } from './screens/employee-portal/employee-portal.component';
import { AngularModalModule } from 'angular-modal-simple';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { RequsetPositionComponent } from './screens/modals/requset-position/requset-position.component';
import { PeriodPickerComponent } from './screens/modals/period-picker/period-picker.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { MatSelectModule } from '@angular/material/select';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from './shared/time-picker/time-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormBuilder } from '@angular/forms';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SignUpScreenComponent } from './screens/sign-up-screen/sign-up-screen.component';
import { RulesForUsingTheAppComponent } from './screens/modals/rules-for-using-the-app/rules-for-using-the-app.component';
import { ReserveNowComponent } from './screens/modals/reserve-now/reserve-now.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { ParkingOnMapComponent } from './shared/parking-on-map/parking-on-map.component';
import { PaypalComponent } from './screens/modals/paypal/paypal.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MyReservationsComponent } from './screens/my-reservations/my-reservations.component';
import { PaymentConfirmationComponent } from './shared/payment-confirmation/payment-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BusySpotsComponent } from './screens/employee-portal/busy-spots/busy-spots.component';
import { SpotComponent } from './screens/employee-portal/busy-spots/spot/spot.component';
import { ReservationsComponent } from './screens/employee-portal/reservations/reservations.component';
import { ReservationComponent } from './screens/employee-portal/reservations/reservation/reservation.component';
import { MyReservationComponent } from './screens/my-reservations/my-reservation/my-reservation.component';
import { CancelReservationComponent } from './screens/my-reservations/my-reservation/cancel-reservation/cancel-reservation.component';
import { EditCarNumberComponentComponent } from './screens/my-reservations/my-reservation/edit-car-number-component/edit-car-number-component.component';
import { AddOneHourComponent } from './screens/my-reservations/my-reservation/add-one-hour/add-one-hour.component';
import { UsersComponent } from './screens/employee-portal/users/users.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    WelcomeComponent,
    AllParkingsScreenComponent,
    ParkingComponent,
    NavigationBarComponent,
    EmployeePortalComponent,
    RequsetPositionComponent,
    PeriodPickerComponent,
    LoginScreenComponent,
    SignUpScreenComponent,
    RulesForUsingTheAppComponent,
    ReserveNowComponent,
    TimePickerComponent,
    DatePickerComponent,
    ParkingOnMapComponent,
    PaypalComponent,
    MyReservationsComponent,
    PaymentConfirmationComponent,
    BusySpotsComponent,
    SpotComponent,
    ReservationsComponent,
    ReservationComponent,
    MyReservationComponent,
    CancelReservationComponent,
    EditCarNumberComponentComponent,
    AddOneHourComponent,
    UsersComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MdbModalModule,
    NgbModule,
    MatSelectModule,
    DropDownListModule,
    MatDatepickerModule,
    AngularModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJWP7ipO6BtS95RUCUjwXEnNokd1_0tGU',
    }),
    GoogleMapsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    IntlModule,
    DateInputsModule,
    LabelModule,
    ButtonsModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,

  ],
  providers: [FormBuilder, NgbActiveModal
  ],
  bootstrap: [AppComponent],
  exports: [MatInputModule],
})
export class AppModule { }
