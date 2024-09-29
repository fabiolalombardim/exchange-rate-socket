import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { Transaction } from './transactions.schema';
import { ObjectId } from 'mongoose';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll()
  }

  @Get(':id')
  async findTrx(@Param('id') id: ObjectId): Promise<Transaction> {
    return this.transactionService.findById(id);
  }
}
