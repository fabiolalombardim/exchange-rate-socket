import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { ConfigService } from './config.service';
import { Account } from '../models/account.model';
import { AccountTransactions } from '../models/account-transactions';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let mockConfigService: ConfigService;

  const mockApiUrl = 'http://google.com';

  beforeEach(() => {
    mockConfigService = { apiUrl: mockApiUrl } as ConfigService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountService,
        { provide: ConfigService, useValue: mockConfigService },
      ]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are made
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAccounts', () => {
    it('should fetch accounts from the API', () => {
      const mockAccounts: Account[] = [
        { _id: '1', name: 'Account 1', category: 'Category 1', tag: 'Tag 1', balance: 100, available_balance: 50 },
        { _id: '2', name: 'Account 2', category: 'Category 2', tag: 'Tag 2', balance: 200, available_balance: 150 },
      ];

      service.getAccounts().subscribe((accounts) => {
        expect(accounts.length).toBe(2);
        expect(accounts).toEqual(mockAccounts);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/accounts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockAccounts);
    });
  });

  describe('getAccountTransactions', () => {
    it('should fetch account transactions by ID from the API', () => {
      const accountId = '123';
      const mockTransactions: AccountTransactions = {
        _id: '111',
        account_id: '123',
        txs: [
          { confirmed_date: '2024-08-11T23:00:00.000Z', order_id: 'APVRTG', tx_type: '1', debit: 0, credit: 1, balance: 1 },
          { confirmed_date: '2024-08-11T23:00:00.000Z', order_id: 'FBFGMS', tx_type: '2', debit: 0.000481, credit: 0, balance: 0.000481 },
        ]
      };


      service.getAccountTransactions(accountId).subscribe((transactions) => {
        expect(transactions).toEqual(mockTransactions);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/transactions/${accountId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTransactions);
    });
  });
});
