import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '../modules/account/account.module';
import { SocketGateway } from '../modules/gateway/socket.gateway';
import { TransactionSchema } from '../modules/transactions/transactions.schema';
import { TransactionsController } from '../modules/transactions/transactions.controller';
import { TransactionModule } from '../modules/transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_URI, {
    dbName: 'accounts'
  }),
  MongooseModule.forFeature([{ name: 'transactions', schema: TransactionSchema }])
  , AccountModule, TransactionModule],
  controllers: [AppController, TransactionsController],
  providers: [AppService, SocketGateway],
})
export class AppModule { }
