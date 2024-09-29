import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { HomeComponent } from './home.component';
import { AccountService } from '../../services/account.service';
import { SocketService } from '../../services/exchange-rate.service';
import { Account } from '../../models/account.model';
import { BalanceRegistry } from '../../models/balance-registry';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let mockAccountService: jest.Mocked<AccountService>;
  let mockSocketService: jest.Mocked<SocketService>;

  let exchangeRateSubject: BehaviorSubject<number>;
  let balanceUpdateSubject: BehaviorSubject<BalanceRegistry>;

  beforeEach(async () => {
    // Mock AccountService and SocketService using Jest
    mockAccountService = {
      getAccounts: jest.fn(),
    } as unknown as jest.Mocked<AccountService>;

    mockSocketService = {
      getCurrentExchangeRate: jest.fn(),
      exchangeRate$: new BehaviorSubject<number>(1000),
      balanceUpdate$: new BehaviorSubject<BalanceRegistry>({ accountId: '1', newAvailableBalance: 500 } as BalanceRegistry),
    } as unknown as jest.Mocked<SocketService>;

    // Mock return values
    exchangeRateSubject = mockSocketService.exchangeRate$ as BehaviorSubject<number>;
    balanceUpdateSubject = mockSocketService.balanceUpdate$ as BehaviorSubject<BalanceRegistry>;

    mockAccountService.getAccounts.mockReturnValue(of([
      { _id: '1', name: 'Account 1', category: 'Category 1', tag: 'Tag 1', balance: 1, available_balance: 1 } as Account,
      { _id: '2', name: 'Account 2', category: 'Category 2', tag: 'Tag 2', balance: 2, available_balance: 2 } as Account
    ]));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: SocketService, useValue: mockSocketService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct exchange rate and accounts', () => {
    expect(component.exchangeRate).toEqual(1000);
    expect(component.dataSource.length).toBe(2);
    expect(component.dataSource[0].name).toBe('Account 1');
  });

  it('should call formatBalances when exchange rate is updated', () => {
    jest.spyOn(component, 'formatBalances');
    exchangeRateSubject.next(1200); // Push new exchange rate
    expect(component.formatBalances).toHaveBeenCalled();
    expect(component.exchangeRate).toEqual(1200);
  });

  it('should call updateAccountBalance when balance update is received', () => {
    jest.spyOn(component, 'updateAccountBalance');
    balanceUpdateSubject.next({ accountId: '1', newAvailableBalance: 500 } as BalanceRegistry);
    expect(component.updateAccountBalance).toHaveBeenCalled();
  });

  it('should format balances correctly', () => {
    component.exchangeRate = 2000;
    component.formatBalances();
  });

  it('should update the correct account balance in updateAccountBalance', () => {
    component.updatedAccount = { accountId: '1', newAvailableBalance: 500 } as BalanceRegistry;
    component.updateAccountBalance();

    expect(component.dataSource[0].available_balance).toBe(500);
  });

  it('should unsubscribe on destroy', () => {
    const subscriptionSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
