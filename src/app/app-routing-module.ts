import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { AllParkingsScreenComponent } from './screens/allParkings/all-parkings-screen/all-parkings-screen.component';
import { EmployeePortalComponent } from './screens/employee-portal/employee-portal.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
// import { ParkingFullComponentComponent } from './screens/parking-full-component/parking-full-component.component';
import { SignUpScreenComponent } from './screens/sign-up-screen/sign-up-screen.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { MyReservationsComponent } from './screens/my-reservations/my-reservations.component';
import { EmployeeGuard } from './services/employee-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  {
    path: 'parkings',
    component: AllParkingsScreenComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    // canActivate: [AuthGuardService]
  },
  // {
  //   path: 'parking/:id',
  //   component: ParkingFullComponentComponent,
  //   // canActivate: [AuthGuardService]
  // },
  {
    path: 'portal',
    component: EmployeePortalComponent,
     canActivate: [EmployeeGuard]
  },
  {
    path: 'login',
    component: LoginScreenComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignUpScreenComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'myreservations',
    component: MyReservationsComponent,
    // canActivate: [AuthGuardService]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'welcome' }
  // {
  //   path: 'configuration/parkings/new', component: NewParkingComponent,
  //   canActivate: [AuthGuardService]
  // },
  // { path: '**', pathMatch: 'full', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

