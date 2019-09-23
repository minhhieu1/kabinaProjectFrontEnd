import { TestBed } from '@angular/core/testing';

import { BookingUpdateService } from './booking-update.service';

describe('BookingUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingUpdateService = TestBed.get(BookingUpdateService);
    expect(service).toBeTruthy();
  });
});
