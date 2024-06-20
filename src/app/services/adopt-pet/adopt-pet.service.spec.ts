import { TestBed } from '@angular/core/testing';

import { AdoptPetService } from './adopt-pet.service';

describe('AdoptPetService', () => {
  let service: AdoptPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
