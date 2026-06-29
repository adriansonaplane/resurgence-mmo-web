import { Module } from '@nestjs/common';
import { AccountServiceClient } from './account-service.client';

@Module({
  providers: [AccountServiceClient],
  exports: [AccountServiceClient],
})
export class AccountServiceModule {}
