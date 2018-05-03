import { PartOrdersComponent } from './part-orders/part-orders.component';
import { SignupComponent } from './signup/signup.component';
import { ProgressComponent } from './progress/progress.component';
import { LoginComponent } from './login/login.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { LandingComponent } from './landing/landing.component';
import { GarageComponent } from './garage/garage.component';
import { CAR_ROUTES } from './car-routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarRepairsComponent } from './car-repairs/car-repairs.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CAR_ROUTES),
    ReactiveFormsModule
  ],
  declarations: [
    // components go here
    CarDetailsComponent,
    CarRepairsComponent,
    GarageComponent,
    LandingComponent,
    HamburgerComponent,
    LoginComponent,
    ProgressComponent,
    SignupComponent,
    PartOrdersComponent
  ],
  exports: [
    HamburgerComponent
  ]
})
export class ComponentsModule { }
