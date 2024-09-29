import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

class TransactionItem {
  @Prop({ required: true })
  confirmed_date: string;

  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  tx_type: string;

  @Prop({ required: true })
  debit: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  balance: number;
}

@Schema()
export class Transaction {
  @Prop({ type: SchemaTypes.ObjectId })
  account_id: Types.ObjectId;

  @Prop()
  txs: TransactionItem[];
}



export const TransactionSchema = SchemaFactory.createForClass(Transaction);
