import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsBookingComponent } from './us-booking.component';

describe('UsBookingComponent', () => {
  let component: UsBookingComponent;
  let fixture: ComponentFixture<UsBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
