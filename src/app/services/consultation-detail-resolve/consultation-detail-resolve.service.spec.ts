import { TestBed, inject } from '@angular/core/testing';

import { ConsultationDetailResolveService } from './consultation-detail-resolve.service';

describe('ConsultationDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultationDetailResolveService]
    });
  });

  it('should be created', inject([ConsultationDetailResolveService], (service: ConsultationDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
