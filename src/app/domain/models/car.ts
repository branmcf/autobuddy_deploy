import { Repair } from './repair'
export class Car {
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_vin?: string;
  vehicle_owner?: string;
  vehicle_color?: string;
  vehicle_init_diagnosis?: string;
  vehicle_manager?:string;
  checkedIn?: Date;
  completedRepairs?: Repair[];
  inProgressRepairs?: Repair[];
  repairs?: number;
  garage_id: number;
  checkInDate?: number;
  vehicle_id?: number;
  progress?: number;
}
