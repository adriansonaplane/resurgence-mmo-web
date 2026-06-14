import { Module } from '@nestjs/common';
import { EntitlementBridgeController, EntitlementsController } from './entitlements.controller';
import { EntitlementsService } from './entitlements.service';

@Module({
  controllers: [EntitlementsController, EntitlementBridgeController],
  providers: [EntitlementsService],
  exports: [EntitlementsService],
})
export class EntitlementsModule {}
