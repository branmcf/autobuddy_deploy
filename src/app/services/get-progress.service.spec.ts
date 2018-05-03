import { TestBed, inject } from '@angular/core/testing';

import { GetProgressService } from './get-progress.service';

describe('GetProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProgressService]
    });
  });

  it('should be created', inject([GetProgressService], (service: GetProgressService) => {
    expect(service).toBeTruthy();
  }));
});
