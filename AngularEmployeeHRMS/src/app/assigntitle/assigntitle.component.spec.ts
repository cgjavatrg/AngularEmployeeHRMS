import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigntitleComponent } from './assigntitle.component';

describe('AssigntitleComponent', () => {
  let component: AssigntitleComponent;
  let fixture: ComponentFixture<AssigntitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigntitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigntitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
