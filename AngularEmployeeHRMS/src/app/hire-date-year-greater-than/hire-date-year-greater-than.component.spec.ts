import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireDateYearGreaterThanComponent } from './hire-date-year-greater-than.component';

describe('HireDateYearGreaterThanComponent', () => {
  let component: HireDateYearGreaterThanComponent;
  let fixture: ComponentFixture<HireDateYearGreaterThanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireDateYearGreaterThanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireDateYearGreaterThanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
