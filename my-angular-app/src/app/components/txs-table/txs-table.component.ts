import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/account-transactions';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './txs-table.component.html',
  styleUrl: './txs-table.component.scss'
})

export class TransactionTableComponent implements OnChanges  {
  @Input() transactions: Transaction[] = [];
  @Input() noData?: boolean = false;
  displayedColumns: string[] = ['confirmed_date', 'order_id', 'tx_type', 'debit', 'credit', 'balance'];


  public translateType = (type: string): string => {
    switch (type) {
      case "1": return "Deposit"
      case "2": return "Withdrawn"
      default: return ""
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.transactions = changes['transactions'].currentValue;
  }

}
