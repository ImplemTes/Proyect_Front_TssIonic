import { TestBed } from '@angular/core/testing';

import { ControlaccesoService } from './controlacceso.service';

describe('ControlaccesoService', () => {
  let service: ControlaccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlaccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
