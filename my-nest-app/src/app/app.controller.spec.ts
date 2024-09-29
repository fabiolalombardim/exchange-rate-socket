import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AccountService } from '../modules/account/account.service';

describe('AppController', () => {
  let appController: AppController;
  let accountService: AccountService;

  const mockAccounts = [
    { _id: '1', name: 'Account 1', balance: 100, available_balance: 50 },
    { _id: '2', name: 'Account 2', balance: 200, available_balance: 150 },
  ];

  const mockAccountService = {
    findAll: jest.fn().mockResolvedValue(mockAccounts),
    findById: jest.fn().mockImplementation((id: string) =>
      Promise.resolve(mockAccounts.find(account => account._id === id))
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AccountService,
          useValue: mockAccountService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getData', () => {
    it('should return an array of accounts', async () => {
      const result = await appController.getData();
      expect(result).toEqual(mockAccounts);
      expect(accountService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single account by ID', async () => {
      const id = '1';
      const result = await appController.findOne(id);
      expect(result).toEqual(mockAccounts[0]);
      expect(accountService.findById).toHaveBeenCalledWith(id);
    });

    it('should return undefined if the account is not found', async () => {
      const id = 'non-existent-id';
      const result = await appController.findOne(id);
      expect(result).toBeUndefined();
      expect(accountService.findById).toHaveBeenCalledWith(id);
    });
  });
});
