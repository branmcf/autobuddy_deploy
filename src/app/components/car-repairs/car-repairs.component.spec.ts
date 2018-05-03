import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRepairsComponent } from './car-repairs.component';

describe('CarRepairsComponent', () => {
  let component: CarRepairsComponent;
  let fixture: ComponentFixture<CarRepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRepairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
