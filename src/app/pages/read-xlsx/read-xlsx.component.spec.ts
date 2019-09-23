import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadXlsxComponent } from './read-xlsx.component';

describe('ReadXlsxComponent', () => {
  let component: ReadXlsxComponent;
  let fixture: ComponentFixture<ReadXlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadXlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
