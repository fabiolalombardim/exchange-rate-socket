import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
