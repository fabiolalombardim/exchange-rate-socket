export interface Account {
  _id: string;
  name: string;
  category: string;
  tag: string;
  balance: number;
  available_balance: number;
  balance_in_usd?: number;
  available_balance_in_usd?: number;
  exchange_rate?: number;
  last_balance?: number;
}
