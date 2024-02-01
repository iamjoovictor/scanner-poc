import { TestBed } from '@angular/core/testing';

import { GetTranslateService } from './get-translate.service';

describe('GetTranslateService', () => {
  let service: GetTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
