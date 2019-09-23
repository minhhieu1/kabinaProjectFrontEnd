import { TestBed } from '@angular/core/testing';

import { BookingHistoryService } from './booking-history.service';

describe('BookingHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingHistoryService = TestBed.get(BookingHistoryService);
    expect(service).toBeTruthy();
  });
});
