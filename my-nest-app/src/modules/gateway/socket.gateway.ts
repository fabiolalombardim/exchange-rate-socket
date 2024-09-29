import {
  WebSocketServer,
  OnGatewayInit,
  WebSocketGateway
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { interval } from 'rxjs';
import { Chance } from 'chance';
import { randomInt } from 'crypto';
import { getRandomItem } from '../../utils/utils';

const ids = ['66f5b8abfb32e528cb811ce5'];

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private exchangeRate: number;

  afterInit() {
    this.sendInitialExchangeRate();
    this.startExchangeRateUpdates();
    this.startBalanceUpdates();
  }

  handleConnection() {
    this.exchangeRate = this.getRandomExchangeRate();
    this.server.emit('exchangeRate', this.exchangeRate); // Send the initial exchange rate on connection
  }


  private sendInitialExchangeRate() {
    this.exchangeRate = this.getRandomExchangeRate();
    this.server.emit('exchangeRate', this.exchangeRate);
  }

  private startExchangeRateUpdates() {
    interval(30000).subscribe(() => {
      this.exchangeRate = this.getRandomExchangeRate();
      this.server.emit('exchangeRate', this.exchangeRate);
    });
  }

  private getRandomExchangeRate(): number {
    const chance = new Chance();
    return chance.floating({ min: 5000, max: 12001, fixed: 2 }); // Generates a random number between 5000 and 12000
  }

  private startBalanceUpdates() {
    interval(randomInt(10000, 10001)).subscribe(() => {
      const accountId = getRandomItem(ids); // Simulate an account ID
      const newAvailableBalance = this.generateRandomBalance();

      this.server.emit('balanceUpdate', {
        accountId,
        newAvailableBalance,
      });
    });
  }

  private generateRandomBalance(): number {
    const chance = new Chance();
    return chance.floating({ min: 2.5, max: 4.5, fixed: 2 });
  }
}
