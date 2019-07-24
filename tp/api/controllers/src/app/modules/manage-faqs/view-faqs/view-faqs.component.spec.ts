import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFaqsComponent } from './view-faqs.component';

describe('ViewFaqsComponent', () => {
  let component: ViewFaqsComponent;
  let fixture: ComponentFixture<ViewFaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
