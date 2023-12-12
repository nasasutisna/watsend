import { TestBed } from '@angular/core/testing';

import { AddMobService } from './add-mob.service';

describe('AddMobService', () => {
  let service: AddMobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
