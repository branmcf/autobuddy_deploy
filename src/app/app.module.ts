import { AppointmentRepository } from './domain/appointment-repository';
import { MaterialModule } from './domain/material/material.module';
import { PartRepository } from './domain/part-repository';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FilterCompletedRepairsPipe } from './pipes/filter-completed-repairs.pipe';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { UserRepository } from './domain/user-repository';
import { CarRepository } from './domain/car-repository';
import { RepositoryService } from './domain/repository.service';
import { ComponentsModule } from './components/components.module';
import { RepairRepository } from './domain/repair-repository';
import { GarageRepository } from './domain/garage-repository';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/landing', pathMatch: 'full' }
    ]),
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    UserRepository,
    CarRepository,
    RepairRepository,
    GarageRepository,
    PartRepository,
    AppointmentRepository
  ],
  exports: [MaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
