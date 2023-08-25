import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndeptComponent } from './assigndept.component';

describe('AssigndeptComponent', () => {
  let component: AssigndeptComponent;
  let fixture: ComponentFixture<AssigndeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigndeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigndeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
