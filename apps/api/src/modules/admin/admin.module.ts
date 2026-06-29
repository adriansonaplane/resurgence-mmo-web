import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../account-service/account-service.module';
import { AuditModule } from '../audit/audit.module';
import { ContactModule } from '../contact/contact.module';
import { EntitlementsModule } from '../entitlements/entitlements.module';
import { OrdersModule } from '../orders/orders.module';
import { SupportModule } from '../support/support.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AccountServiceModule, AuditModule, ContactModule, EntitlementsModule, OrdersModule, SupportModule],
  controllers: [AdminController],
})
export class AdminModule {}
