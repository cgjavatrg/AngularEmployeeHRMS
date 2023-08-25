import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrAfterFromDateComponent } from './mgr-after-from-date.component';

describe('MgrAfterFromDateComponent', () => {
  let component: MgrAfterFromDateComponent;
  let fixture: ComponentFixture<MgrAfterFromDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgrAfterFromDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgrAfterFromDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
