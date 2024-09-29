import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { ConfigService } from './config.service';
import { AccountTransactions } from '../models/account-transactions';

@Injectable({
  providedIn: 'root' // Provide this service application-wide
})
export class AccountService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  // Fetch all accounts
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.configService.apiUrl}/accounts`);
  }

  // Fetch a single account and it's transactions by ID
  getAccountTransactions(id: string): Observable<AccountTransactions> {
    return this.http.get<AccountTransactions>(`${this.configService.apiUrl}/transactions/${id}`);
  }
}
