import { TestBed } from '@angular/core/testing';

import { InstantWaApiService } from './instant-wa-api.service';

describe('InstantWaApiService', () => {
  let service: InstantWaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantWaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
