import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteempComponent } from './deleteemp.component';

describe('DeleteempComponent', () => {
  let component: DeleteempComponent;
  let fixture: ComponentFixture<DeleteempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
