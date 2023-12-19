import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOneHourComponent } from './add-one-hour.component';

describe('AddOneHourComponent', () => {
  let component: AddOneHourComponent;
  let fixture: ComponentFixture<AddOneHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOneHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOneHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
