import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransactionService } from './transactions.service';
import { Transaction } from './transactions.schema';
import mongoose, { Model, ObjectId } from 'mongoose';

describe('TransactionService', () => {
  let service: TransactionService;
  let model: Model<Transaction>;

  const mockTransaction = {
    _id: 'mockId',
    account_id: 'mockAccountId',
    txs: [
      {
        confirmed_date: '2024-08-11T23:00:00.000Z',
        order_id: 'APVRTG',
        tx_type: '1',
        debit: 0,
        credit: 1,
        balance: 1,
      },
    ],
  };

  const mockTransactionModel = {
    findOne: jest.fn().mockResolvedValue(mockTransaction),
    find: jest.fn().mockResolvedValue([mockTransaction]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    model = module.get<Model<Transaction>>(getModelToken(Transaction.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return null if no transaction is found', async () => {
      model.findOne = jest.fn().mockResolvedValue(null);
      const id: ObjectId = 'nonexistentId' as unknown as mongoose.Schema.Types.ObjectId;
      await service.findById(id);
      expect(model.findOne).toHaveBeenCalledWith({ account_id: id });
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
       await service.findAll();
      expect(model.find).toHaveBeenCalled();
    });
  });
});
