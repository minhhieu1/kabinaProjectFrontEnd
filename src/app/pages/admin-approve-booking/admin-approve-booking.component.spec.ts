import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveBookingComponent } from './admin-approve-booking.component';

describe('AdminApproveBookingComponent', () => {
  let component: AdminApproveBookingComponent;
  let fixture: ComponentFixture<AdminApproveBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApproveBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
