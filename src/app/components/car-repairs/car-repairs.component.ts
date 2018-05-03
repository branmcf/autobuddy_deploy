import { Part } from './../../domain/models/part';
import { GarageRepository } from './../../domain/garage-repository';
import { CarRepository } from './../../domain/car-repository';
import { Car } from "../../domain/models";
import { trigger, style, animate, transition } from "@angular/animations";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repair } from '../../domain/models/repair';
import { RepairRepository } from "../../domain/repair-repository";
import { ActivatedRoute, Router } from "@angular/router";
import { PartRepository } from '../../domain/part-repository';
@Component({
  selector: "app-car-repairs",
  templateUrl: "./car-repairs.component.html",
  styleUrls: ["./car-repairs.component.css"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateY(100%)", opacity: 0 }),
        animate("500ms", style({ transform: "translateY(0)", opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translateY(0)", opacity: 1 }),
        animate("500ms", style({ transform: "translateY(100%)", opacity: 0 }))
      ])
    ])
  ]
})
export class CarRepairsComponent implements OnInit {
  public newRepair: Repair;
  @Input() public completeRepairs: Repair[];
  @Input() public inProgressRepairs: Repair[];
  @Input() public car: Car;
  public today: Date;
  public noteVisible: boolean[];
  public repaired: boolean;
  public part: Part;
  public parts:Part[];
  public id: number;
  public progress: number;
  public crosshair: boolean;
  public crosshairCursor: boolean;
  public crosshairX: number;
  public crosshairY: number;
  @Output() onMarkComplete= new EventEmitter<boolean>();

  constructor(
    private repairRepository: RepairRepository,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private partRepository:PartRepository

  ) {}

  ngOnInit() {
    this.newRepair = new Repair;
    this.newRepair.parts=[];
    this.crosshairCursor = false;
    this.crosshair = false;
    this.id = 0;
    this.part = new Part;
    this.repaired = true;
    this.noteVisible = [];
    this.progress = 0;
    this.partRepository.showPartsForUser().subscribe(data => {
      this.parts = data;
    })
  }
  addPart() {
    console.log(this.part);
    this.newRepair.parts.push(this.part);
    this.part = new Part;
  }
  public addRepair() {
    this.today = new Date();
    this.newRepair.repair_date = this.today.toLocaleDateString();
    this.newRepair.completed = false;

    // we dont actually need these, but for the purpose
    // of the request, we need them.
    console.log('hello');
    console.log(this.car);
    this.newRepair.vehicle_id = this.car.vehicle_id;
    this.newRepair.repair_status = "not repaired";
    // need to add cost, carId, repairStatus (string)

    this.inProgressRepairs.push(this.newRepair);
    let image = document.getElementById("carPhoto");
    // relative placing of circle based on width/height ratio
    let xPosImage = image.clientWidth * this.newRepair.repair_x_cord;
    let yPosImage = image.clientHeight * this.newRepair.repair_y_cord;
    // offset of image posiition
    let imageOffsetX = image.offsetLeft;
    let imageOffsetY = image.offsetTop;
    // final position of dot = offset + relative

    this.newRepair.repair_x_cord = Math.round(xPosImage + imageOffsetX - 45);
    this.newRepair.repair_y_cord = Math.round(yPosImage + imageOffsetY + 50);
    console.log(this.newRepair.repair_x_cord);
    console.log(this.newRepair.repair_y_cord)
    console.log(this.newRepair);

    // API call
    this.repairRepository.addRepair(this.newRepair).subscribe(res => {
      console.log("thisrepair: ", res);
      this.repairRepository.getMostRecentRepair().subscribe(data =>{
        const partInfo= {
          "repair_id": data.results[0].repair_id,
          "part_id": this.newRepair.parts[0].part_id
        }
        this.partRepository.attachRepair(partInfo).subscribe(res => {
          console.log("attached Part to repair", res);
          console.log(partInfo);
        })
      })


      // Resetting info
      this.crosshairCursor = false;
      this.progress =
        100 *
        this.completeRepairs.length /
        (this.completeRepairs.length + this.inProgressRepairs.length);
      this.part = new Part;
      // this.router.navigateByUrl
    });
    // End of api call
  }
  onMousedown(event) {
    this.crosshairX = event.offsetX;
    this.crosshairY = event.offsetY;
    this.newRepair.repair_x_cord = event.offsetX / event.target.clientWidth;
    this.newRepair.repair_y_cord = event.offsetY / event.target.clientHeight;
  }
  public markComplete(repairID: number) {

    let currentId;
    for (let x = 0; x < this.inProgressRepairs.length; x++) {
      if (this.inProgressRepairs[x].repair_id == repairID) {
        currentId = x;
      }
    }
    this.inProgressRepairs[currentId].repair_status="repaired";
    console.log(this.inProgressRepairs[currentId])
    this.repairRepository.updateRepair(this.inProgressRepairs[currentId]).subscribe(data => {


      this.inProgressRepairs[currentId].completed = true;
      this.completeRepairs.push(this.inProgressRepairs[currentId]);
      this.inProgressRepairs.splice(currentId, 1);
      this.progress =
        100 *
        this.completeRepairs.length /
        (this.completeRepairs.length + this.inProgressRepairs.length);

      });
      // this.onMarkComplete.emit(true);

  }
}
