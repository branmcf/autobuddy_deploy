import { GarageRepository } from "./../../domain/garage-repository";
import { Component, OnInit, Input } from "@angular/core";
import { Part } from "../../domain/models/part";
import { Car } from "../../domain/models/car";
import { PartRepository } from "../../domain/part-repository";
import { UserRepository } from "../../domain/user-repository";
import { CarRepository } from "./../../domain/car-repository";

@Component({
  selector: "app-part-orders",
  templateUrl: './part-orders.component.html',
  styleUrls: ['./part-orders.component.css']
})
export class PartOrdersComponent implements OnInit {
  public newPart: Part;
  public id: number;
  public garageUser: boolean;
  public edit: boolean[];
  public orders: Part[] = [];
  @Input() public userType: string;
  @Input() public parts: Part[];
  @Input() public cars: Car[];
  constructor(
    private partRepository: PartRepository,
    private garageRepository: GarageRepository,
    private userRepository: UserRepository,
    private carRepository: CarRepository
  ) {}

  ngOnInit() {
    this.newPart = {};
    this.id = 0;
    this.edit = [];

    this.userRepository.getUserType().subscribe(userData => {
      console.log('userData:', userData);
      if (userData.type === 'garage') {
        this.garageUser = false;
        this.carRepository.showGarages().subscribe(res => {
          console.log('cars in garage: ', res);
          this.parts = res.parts;
        });
      }
      if (userData.type === 'customer') {
        this.garageUser = true;
        this.partRepository.showPartsForUser().subscribe(data => {
          console.log('parts ', data);
          this.parts = data;
      });
    }
  });
}

  public addPart() {
    this.newPart.part_status = 'Ordered';

    this.partRepository.addPart(this.newPart).subscribe(res => {
      this.parts.push(this.newPart);
      this.newPart = {};
    });
  }

  public changeStatus(partID: number, status: string) {
    let currentId;
    for (let x = 0; x < this.parts.length; x++) {
      if (this.parts[x].part_id == partID) {
        currentId = x;
      }
    }
    const updatedInfo = {
      part_id: partID,
      part_status: status
    };
    this.partRepository.updatePartStatus(updatedInfo).subscribe(res => {
      this.parts[currentId].part_status = status;
      this.edit[currentId] = !this.edit[currentId];
    });
  }
}
