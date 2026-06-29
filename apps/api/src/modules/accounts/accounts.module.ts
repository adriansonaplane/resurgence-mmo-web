import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../account-service/account-service.module';
import { EntitlementsModule } from '../entitlements/entitlements.module';
import { OrdersModule } from '../orders/orders.module';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [AccountServiceModule, OrdersModule, EntitlementsModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
