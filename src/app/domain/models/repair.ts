import { Part } from './part';

export class Repair {
  repair_title?: string;
  parts?: Part[];
  repair_notes?: string;
  repair_x_cord?: number;
  repair_y_cord?: number;
  repair_id?: number;
  vehicle_id?: number;
  cost?: number;
  completed?: boolean;
  repair_date?: string;
  repair_status?: string;
}
