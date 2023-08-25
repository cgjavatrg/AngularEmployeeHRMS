import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInLastSomeYearsComponent } from './emp-in-last-some-years.component';

describe('EmpInLastSomeYearsComponent', () => {
  let component: EmpInLastSomeYearsComponent;
  let fixture: ComponentFixture<EmpInLastSomeYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpInLastSomeYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInLastSomeYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
