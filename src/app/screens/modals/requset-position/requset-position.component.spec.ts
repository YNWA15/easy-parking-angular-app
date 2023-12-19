import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequsetPositionComponent } from './requset-position.component';

describe('RequsetPositionComponent', () => {
  let component: RequsetPositionComponent;
  let fixture: ComponentFixture<RequsetPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequsetPositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequsetPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
