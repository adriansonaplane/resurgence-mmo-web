import { Module } from '@nestjs/common';
import { EntitlementsModule } from '../entitlements/entitlements.module';
import { OrdersModule } from '../orders/orders.module';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [OrdersModule, EntitlementsModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
