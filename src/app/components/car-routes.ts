import { CarRepairsComponent } from './car-repairs/car-repairs.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GarageComponent } from './garage/garage.component';
import { CarDetailsComponent } from './car-details/car-details.component';

export const CAR_ROUTES: Route[] = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'garage',
    component: GarageComponent
  },
  {
    path: 'car/:vehicle_id',
    component: CarDetailsComponent
  },
  {
    path: 'garage/car/repairs/{carId}',
    component: CarRepairsComponent
  },

];
