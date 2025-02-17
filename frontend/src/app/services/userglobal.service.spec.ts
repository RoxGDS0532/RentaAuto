import { TestBed } from '@angular/core/testing';

import { UserglobalService } from './userglobal.service';

describe('UserglobalService', () => {
  let service: UserglobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserglobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
