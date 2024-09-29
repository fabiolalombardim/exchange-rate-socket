import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { ConfigService } from './config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ConfigService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
