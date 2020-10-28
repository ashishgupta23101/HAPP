/**
 * PunnuMistri - E-commerce app starter Ionic 4( )
 *
 * Copyright © 2018-present PunnuMistri. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */

import { TestBed } from '@angular/core/testing';

import { FunctionsService } from './functions.service';

describe('FunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionsService = TestBed.get(FunctionsService);
    expect(service).toBeTruthy();
  });
});
