export interface AccountTransactions {
  _id: string
  account_id: string
  txs: Transaction[]
}

export interface Transaction {
  confirmed_date: string;
  order_id: string;
  tx_type: string;
  debit: number;
  credit: number;
  balance: number;
  debit_usd_balance?: number;
  credit_usd_balance?: number;
  balance_usd_balance?: number
}
