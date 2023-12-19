import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingOnMapComponent } from './parking-on-map.component';

describe('ParkingOnMapComponent', () => {
  let component: ParkingOnMapComponent;
  let fixture: ComponentFixture<ParkingOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingOnMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
