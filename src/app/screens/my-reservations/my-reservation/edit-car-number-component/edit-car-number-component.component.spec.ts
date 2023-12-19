import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarNumberComponentComponent } from './edit-car-number-component.component';

describe('EditCarNumberComponentComponent', () => {
  let component: EditCarNumberComponentComponent;
  let fixture: ComponentFixture<EditCarNumberComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarNumberComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCarNumberComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
