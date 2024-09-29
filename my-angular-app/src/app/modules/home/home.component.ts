import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/exchange-rate.service';
import { BalanceRegistry } from '../../models/balance-registry';
import { compare } from '../../services/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'category', 'tag', 'balance', 'availableBalance'];
  dataSource!: Account[];
  exchangeRate!: number;
  updatedAccount!: BalanceRegistry;
  private subscription!: Subscription;

  constructor(private readonly accountService: AccountService,
              private socketService: SocketService) {
  }

  ngOnInit(): void {

    this.exchangeRate = this.socketService.getCurrentExchangeRate();

    this.subscription = this.socketService.exchangeRate$.subscribe((rate) => {
      this.exchangeRate = rate;
      if (this.dataSource && this.dataSource.length > 0) {
        this.formatBalances();
      }
    });

    this.subscription.add(this.accountService.getAccounts().subscribe((data: Account[]) => {
      this.dataSource = data;
      this.formatBalances();
    }))


    this.subscription.add(this.socketService.balanceUpdate$.subscribe(value => {
      this.updatedAccount = value;
      this.updateAccountBalance()
    }))
  }

  public formatBalances = () => {
    this.dataSource.map((item) => {
      item.available_balance_in_usd = item.available_balance * this.exchangeRate;
      item.balance_in_usd = item.balance * this.exchangeRate;
      item.exchange_rate = this.exchangeRate;
    })
  }

  public updateAccountBalance = () => {
    const account = this.dataSource.find(acc => acc._id === this.updatedAccount.accountId);
    const accountIndex = this.dataSource.findIndex(acc => acc._id === this.updatedAccount.accountId);

    if (account) {
      compare(account, this.updatedAccount, false);
      account.available_balance = this.updatedAccount.newAvailableBalance;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.dataSource.splice(accountIndex, 1, account!);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
