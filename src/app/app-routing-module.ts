import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { AllParkingsScreenComponent } from './screens/allParkings/all-parkings-screen/all-parkings-screen.component';
import { EmployeePortalComponent } from './screens/employee-portal/employee-portal.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { SignUpScreenComponent } from './screens/sign-up-screen/sign-up-screen.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { MyReservationsComponent } from './screens/my-reservations/my-reservations.component';
import { EmployeeGuard } from './services/employee-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'parkings',
    component: AllParkingsScreenComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'portal',
    component: EmployeePortalComponent,
    canActivate: [EmployeeGuard]
  },
  {
    path: 'login',
    component: LoginScreenComponent,
  },
  {
    path: 'signup',
    component: SignUpScreenComponent,
  },
  {
    path: 'myreservations',
    component: MyReservationsComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

