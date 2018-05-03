import { Injectable } from '@angular/core';

@Injectable()
export class GetProgressService {

  constructor() { }
  getProgress(): number {
    return 5
  }
}
