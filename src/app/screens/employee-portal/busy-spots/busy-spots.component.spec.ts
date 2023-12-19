import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusySpotsComponent } from './busy-spots.component';

describe('BusySpotsComponent', () => {
  let component: BusySpotsComponent;
  let fixture: ComponentFixture<BusySpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusySpotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusySpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
