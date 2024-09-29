import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../services/exchange-rate.service';
import { Location } from '@angular/common';
import { Account } from '../../../models/account.model';
import { Transaction } from '../../../models/account-transactions';
import { compare } from '../../../services/utils';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  accountInfo!: Account;
  transactions: Transaction[] = [];
  isLoading = false;
  noData = false;
  exchangeRate!: number;
  updatedAccount!: "";
  flashBalance = false;

  constructor(private readonly accountService: AccountService,
    private readonly socketService: SocketService,
    private readonly location: Location) {
  }

  ngOnInit(): void {

    this.accountInfo = this.location.getState() as Account;
    this.subscription = this.socketService.getExchangeRate().subscribe(val => {
      this.accountInfo.balance_in_usd = this.accountInfo.balance * val
      this.accountInfo.available_balance_in_usd = this.accountInfo.available_balance * val;

      if (this.transactions.length > 0) {
        this.updateBalances(val);
      }
    }, error => {
      console.log("error", error)
    }
    )

    this.getTransactions();
    this.subscription.add(this.socketService.balanceUpdate$.subscribe((updatedAccount) => {
      if (updatedAccount.accountId === this.accountInfo._id) {
        compare(this.accountInfo, updatedAccount, true)
        this.accountInfo.available_balance = updatedAccount.newAvailableBalance;
      }
    }))
  }

  public getTransactions = () => {
    this.isLoading = true;
    this.exchangeRate = this.socketService.getCurrentExchangeRate();

    this.accountService.getAccountTransactions(this.accountInfo._id).subscribe(
      (data) => {
        if (data !== null) {
          this.transactions = data.txs;
          this.updateBalances(this.exchangeRate);
        } else {
          this.noData = true;
        }
        this.isLoading = false;
      }, error => {
        console.log("error", error);
        this.isLoading = false;
      }
    )
  }

  private updateBalances = (rate: number) => {
    this.transactions.forEach((item) => {
      if (item.tx_type === "1") {
        item.credit_usd_balance = item.credit * rate;
      } else {
        item.debit_usd_balance = item.debit * rate;
      }
      item.balance_usd_balance = item.balance * rate
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
