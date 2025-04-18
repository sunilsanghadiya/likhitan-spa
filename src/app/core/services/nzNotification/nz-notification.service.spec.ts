import { TestBed } from '@angular/core/testing';

import { NzNotificationService } from './nz-notification.service';

describe('NzNotificationService', () => {
  let service: NzNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NzNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
