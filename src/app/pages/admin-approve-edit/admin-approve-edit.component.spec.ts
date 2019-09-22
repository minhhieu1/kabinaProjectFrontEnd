import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveEditComponent } from './admin-approve-edit.component';

describe('AdminApproveEditComponent', () => {
  let component: AdminApproveEditComponent;
  let fixture: ComponentFixture<AdminApproveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApproveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
