import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../account-service/account-service.module';
import { EntitlementBridgeController, EntitlementsController } from './entitlements.controller';
import { EntitlementsService } from './entitlements.service';

@Module({
  imports: [AccountServiceModule],
  controllers: [EntitlementsController, EntitlementBridgeController],
  providers: [EntitlementsService],
  exports: [EntitlementsService],
})
export class EntitlementsModule {}
