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
export class PartRepository extends RepositoryService<Part> {
  protected endPoint = "http://ec2-18-221-98-201.us-east-2.compute.amazonaws.com:3000";

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }


  // get garage by id
  public addPart(part: Part): Observable<Part>{
    const url = this.endPoint + '/addPart';
    return this.httpClient.post(url, part, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public showPartsForUser(): Observable<Part[]>{
    const url = this.endPoint + "/showPartsForUser";

    return this.httpClient
      .get(url,this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  public updatePartStatus(part:any): Observable<Part>{
    const url = this.endPoint + "/updatePartStatus";

    return this.httpClient
      .put(url,part,this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  public attachRepair(partInfo:any):Observable<any>{
    const url = this.endPoint + "/attachRepair";

    return this.httpClient
      .put(url,partInfo,this.httpOptions)
      .pipe(catchError(this.handleException));
  }

}
