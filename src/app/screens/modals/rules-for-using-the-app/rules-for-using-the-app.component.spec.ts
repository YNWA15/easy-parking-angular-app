import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesForUsingTheAppComponent } from './rules-for-using-the-app.component';

describe('RulesForUsingTheAppComponent', () => {
  let component: RulesForUsingTheAppComponent;
  let fixture: ComponentFixture<RulesForUsingTheAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RulesForUsingTheAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesForUsingTheAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
