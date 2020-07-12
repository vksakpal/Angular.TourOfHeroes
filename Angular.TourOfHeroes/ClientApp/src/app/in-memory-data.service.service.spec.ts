import { TestBed } from '@angular/core/testing';

import { InMemoryData.ServiceService } from './in-memory-data.service.service';

describe('InMemoryData.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryData.ServiceService = TestBed.get(InMemoryData.ServiceService);
    expect(service).toBeTruthy();
  });
});
