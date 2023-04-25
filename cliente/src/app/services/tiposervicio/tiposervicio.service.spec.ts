import { TestBed } from '@angular/core/testing';

import { TiposervicioService } from './tiposervicio.service';

describe('TiposervicioService', () => {
  let service: TiposervicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposervicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
