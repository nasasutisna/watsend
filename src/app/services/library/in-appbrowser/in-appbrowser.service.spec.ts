import { TestBed } from '@angular/core/testing';

import { InAppbrowserService } from './in-appbrowser.service';

describe('InAppbrowserService', () => {
  let service: InAppbrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InAppbrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
