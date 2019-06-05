import { TestBed } from '@angular/core/testing';

import { NgxFlickingService } from './ngx-flicking.service';

describe('NgxFlickingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFlickingService = TestBed.get(NgxFlickingService);
    expect(service).toBeTruthy();
  });
});
