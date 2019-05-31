import { TestBed, inject } from '@angular/core/testing';

import { BaseCRUDService } from './base-crud.service';

describe('BaseCRUDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseCRUDService]
    });
  });

  it('should be created', inject([BaseCRUDService], (service: BaseCRUDService) => {
    expect(service).toBeTruthy();
  }));
});
