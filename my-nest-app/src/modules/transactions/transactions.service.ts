import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Transaction, TransactionDocument } from './transactions.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private trxModel: Model<TransactionDocument>,
  ) { }

  // Find a specific account by ID
  async findById(id: ObjectId): Promise<Transaction | null> {
    try {
      const result = await this.trxModel.findOne({ "account_id": id }).exec();
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(): Promise<Transaction[]> {
    try {
      const response = await this.trxModel.find().exec();
      return response;
    } catch (error) {
      console.log(error)
    }
  }
}
