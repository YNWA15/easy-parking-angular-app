import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllParkingsScreenComponent } from './all-parkings-screen.component';

describe('AllParkingsScreenComponent', () => {
  let component: AllParkingsScreenComponent;
  let fixture: ComponentFixture<AllParkingsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllParkingsScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllParkingsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
