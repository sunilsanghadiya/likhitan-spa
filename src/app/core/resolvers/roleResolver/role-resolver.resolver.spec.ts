import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { roleResolverResolver } from './role-resolver.resolver';

describe('roleResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => roleResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
