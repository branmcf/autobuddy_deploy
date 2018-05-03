import { catchError } from 'rxjs/operators';
import { Car } from './models/car';
import { Observable } from 'rxjs';
import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepositoryService } from './repository.service';

@Injectable()
export class CarRepository extends RepositoryService<Car> {

  protected endPoint = 'http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  public addCarToGarage(carInfo: any): Observable<any>{
    const url = this.endPoint + '/addCarToGarage';

    return this.httpClient.put(url,carInfo, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public addCar(car: Car): Observable<Car> {
    const url = this.endPoint + '/addVehicle';
    console.log('car: ', car);
    return this.httpClient.post(url, car, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public deleteCar(car: Car): Observable<Car> {
    const url = this.endPoint + '/deleteVehicle' + '/' + car.vehicle_id;
    return this.httpClient.put(url, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public addPart(car: Car): Observable<Car> {
    const url = this.endPoint + '/addVehicle';
    console.log('car: ', car);
    return this.httpClient.post(url, car, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public showVehicle(): Observable<Car[]> {
    const url = this.endPoint + '/showVehicle';
    return this.httpClient.get(url, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public showOneVehicle(vehicle_id:number): Observable<Car>{
    const url = this.endPoint + '/showOneVehicle';
    return this.httpClient.get(`${url}/${vehicle_id}`,this.httpOptions).pipe(
      catchError(this.handleException)
    )
  }
  public showOneVehicleGarage(vehicle_id:number): Observable<Car>{
    const url = this.endPoint + '/showOneVehicleGarage';
    return this.httpClient.get(`${url}/${vehicle_id}`,this.httpOptions).pipe(
      catchError(this.handleException)
    )
  }
  public showRepairsForUser(vehicle_id:number): Observable<Car>{
    const url = this.endPoint + '/showRepairsForUser';
    return this.httpClient.get(`${url}/${vehicle_id}`,this.httpOptions).pipe(
      catchError(this.handleException)
    )
  }
  public showGarages(): Observable<any>{
    const url = this.endPoint + '/showGarages';

    return this.httpClient.get(url,this.httpOptions).pipe(
      catchError(this.handleException)
    )
  }

}
