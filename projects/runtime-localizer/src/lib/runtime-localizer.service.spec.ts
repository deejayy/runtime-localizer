import { TestBed } from '@angular/core/testing';

import { RuntimeLocalizerService } from './runtime-localizer.service';

describe('RuntimeLocalizerService', () => {
  let service: RuntimeLocalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuntimeLocalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
