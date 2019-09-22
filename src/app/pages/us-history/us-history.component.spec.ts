import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsHistoryComponent } from './us-history.component';

describe('UsHistoryComponent', () => {
  let component: UsHistoryComponent;
  let fixture: ComponentFixture<UsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
