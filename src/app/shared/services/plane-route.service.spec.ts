import { TestBed } from '@angular/core/testing';

import { PlaneRouteService } from './plane-route.service';

describe('PlaneRouteService', () => {
  let service: PlaneRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
