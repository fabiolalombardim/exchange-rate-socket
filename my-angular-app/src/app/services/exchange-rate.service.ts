import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { BalanceRegistry } from '../models/balance-registry';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3000');
  private exchangeRateSubject = new BehaviorSubject<number>(0);
  exchangeRate$ = this.exchangeRateSubject.asObservable();

  private balanceUpdateSubject = new Subject<BalanceRegistry>();
  balanceUpdate$ = this.balanceUpdateSubject.asObservable();

  constructor(private configService: ConfigService) {
    this.socket.on('exchangeRate', (exchangeRate: number) => {
      this.exchangeRateSubject.next(exchangeRate);
    });

    this.socket.on('balanceUpdate', (data) => {
      this.balanceUpdateSubject.next(data);
    });
  }

  getExchangeRate() {
    return this.exchangeRate$;
  }

  getCurrentExchangeRate(): number {
    return this.exchangeRateSubject.getValue() || 0;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
