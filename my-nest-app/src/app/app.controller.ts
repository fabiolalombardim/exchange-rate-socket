import { Controller, Get, Param } from '@nestjs/common';

import { AccountService } from '../modules/account/account.service';

@Controller('accounts')
export class AppController {
  constructor(private readonly accountService: AccountService) {}
  @Get()
  async getData() {
    const data = await this.accountService.findAll();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findById(id);
  }
}
