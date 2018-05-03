import { Part } from './models/part';
import { User } from './models/user';
import { Repair } from "./models/repair";
import { Car } from "./models/car";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable, Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RepositoryService } from "./repository.service";

@Injectable()
export class GarageRepository extends RepositoryService<Repair> {
  protected endPoint = "http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000";

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public getGarages() {
    const url = this.endPoint + '/showAllGarages';
    return this.httpClient.get(url, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  // get garage by id
  public getGarageByUser(garageID: number): Observable<User> {
    const url = this.endPoint + "/showGarageForUser";

    return this.httpClient
      .get(`${url}/${garageID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  public favoriteGarage(garageID: number): Observable<User> {
    const url = this.endPoint + "/favorite";
    console.log(garageID);
    return this.httpClient
      .put(url, garageID, this.httpOptions)
      .pipe(catchError(this.handleException));
  }
  public unfavoriteGarage(garageID: number): Observable<User> {
    const url = this.endPoint + "/unfavorite";

    return this.httpClient
      .put(url, garageID, this.httpOptions)
      .pipe(catchError(this.handleException));
  }


}
