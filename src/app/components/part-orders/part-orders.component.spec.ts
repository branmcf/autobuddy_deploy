import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartOrdersComponent } from './part-orders.component';

describe('PartOrdersComponent', () => {
  let component: PartOrdersComponent;
  let fixture: ComponentFixture<PartOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
