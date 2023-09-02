import { TestBed } from '@angular/core/testing';

import { ColorsSchemeService } from './colors-scheme.service';

describe('ColorsSchemeService', () => {
  let service: ColorsSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
