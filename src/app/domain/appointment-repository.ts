import { Appointment } from './models/appointment';
import { catchError } from 'rxjs/operators';
import { Car } from './models/car';
import { Observable } from 'rxjs';
import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepositoryService } from './repository.service';

@Injectable()
export class AppointmentRepository extends RepositoryService<Appointment> {

  protected endPoint = 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public scheduleAppointment(appointment: Appointment): Observable<any> {
    const url = this.endPoint + '/addTimeSlot';
    return this.httpClient.post(url, appointment, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }






}
