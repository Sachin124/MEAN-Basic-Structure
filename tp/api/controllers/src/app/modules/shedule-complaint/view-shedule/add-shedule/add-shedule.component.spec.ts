import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheduleComponent } from './add-shedule.component';

describe('AddSheduleComponent', () => {
  let component: AddSheduleComponent;
  let fixture: ComponentFixture<AddSheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
