import { TestBed } from '@angular/core/testing';

import { ReservaCompletaService } from './reserva-completa.service';

describe('ReservaCompletaService', () => {
  let service: ReservaCompletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaCompletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
