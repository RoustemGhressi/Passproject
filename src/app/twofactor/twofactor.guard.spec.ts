import { TestBed } from '@angular/core/testing';

import { TwofactorGuard } from './twofactor.guard';

describe('TwofactorGuard', () => {
  let guard: TwofactorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TwofactorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
