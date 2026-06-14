import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { EntitlementsModule } from '../entitlements/entitlements.module';
import { OrdersModule } from '../orders/orders.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuditModule, EntitlementsModule, OrdersModule],
  controllers: [AdminController],
})
export class AdminModule {}
