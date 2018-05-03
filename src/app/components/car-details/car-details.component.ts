import { Part } from './../../domain/models/part';
import { GarageRepository } from './../../domain/garage-repository';
import { ActivatedRoute } from '@angular/router';
import { Repair } from './../../domain/models/repair';
import { Car } from './../../domain/models/car';
import { Component, OnInit } from '@angular/core';
import { GetProgressService } from '../../services/get-progress.service';
import { HttpModule } from '@angular/http';
import { CarRepository } from '../../domain/car-repository';
import { UserRepository } from '../../domain/user-repository';


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  public car: Car;
  constructor(
    private activedRoute: ActivatedRoute,
    private carRepository: CarRepository,
    private garageRepository: GarageRepository,
    private userRepository: UserRepository

  ) { }
  public date: Date;
  public progress: number;
  public garageName: String;
  public favorited:boolean;
  public repairs: any;
  public parts: Part[];
  public inProgressRepairs =[];
  public completedRepairs = [];
  public user;
  ngOnInit() {
    this.date = new Date();
    this.activedRoute.paramMap.subscribe((params: any) => {
      this.carRepository.showOneVehicle(params.get('vehicle_id')).subscribe(data => {
        console.log('this is the car');
        console.log(data);
        this.car = data[0];
        this.garageRepository.getGarageByUser(this.car.garage_id).subscribe(dataTwo=> {
          console.log('garage');
          console.log(dataTwo);
          this.garageName=dataTwo[0].garage_name;
        })
      });
    });
    this.activedRoute.paramMap.subscribe((params: any) => {
      this.carRepository.showRepairsForUser(params.get('vehicle_id')).subscribe(data => {
        this.repairs = data;
        this._sortRepairs(this.repairs);

      });
    });

    this.userRepository.getUserInfo().subscribe(user=>{
      this.user=user[0]
      if(this.user.favorite_garage){
        this.favorited=true;
      }
      else{
        this.favorited=false;
      }
    })


    this.repairs = this.completedRepairs.length+this.inProgressRepairs.length;
    this.progress=(this.inProgressRepairs.length/this.repairs)*100;


  }
  private _sortRepairs(repairs: Repair[]){
    for(var x = 0; x< repairs.length;x++){
      if(repairs[x].repair_status=="not repaired"){
        this.inProgressRepairs.push(repairs[x])
      }
      else{
        this.completedRepairs.push(repairs[x])
      }
    }
  }
  public favorite(){
    if(!this.favorited){
      console.log(this.car.garage_id);
      this.garageRepository.favoriteGarage(this.car.garage_id).subscribe(res => {
        console.log("res" + res );
        this.favorited=true;

      })
    }
    else{
      this.garageRepository.unfavoriteGarage(this.car.garage_id).subscribe(res => {
        console.log("res" + res );
        this.favorited=false;
      })
    }
  }

  // onMarkComplete(did: boolean){
  //   if(did){
  //     console.log("updated repairs again");
  //     this.activedRoute.paramMap.subscribe((params: any) => {
  //       this.carRepository.showRepairsForUser(params.get('vehicle_id')).subscribe(data => {
  //         this.repairs = data;
  //         this._sortRepairs(this.repairs);

  //       });
  //     });
  //   }
  // }

}
