import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuditService } from '../audit/audit.service';
import { EntitlementsService } from '../entitlements/entitlements.service';
import { OrdersService } from '../orders/orders.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(Auth0Guard, RolesGuard, PermissionsGuard)
@Roles('support_agent', 'moderator', 'content_editor', 'store_manager', 'developer', 'super_admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly entitlementsService: EntitlementsService,
    private readonly auditService: AuditService,
  ) {}

  @Get('orders')
  @Permissions('admin:read')
  orders() {
    return { orders: this.ordersService.listAll() };
  }

  @Get('orders/:id')
  @Permissions('admin:read')
  order(@Param('id') id: string) {
    return { order: this.ordersService.listAll().find((order) => order.id === id) ?? null };
  }

  @Get('users/:id')
  @Permissions('admin:read')
  user(@Param('id') id: string) {
    return { user: { id, source: 'auth0/local-profile-sync' } };
  }

  @Get('entitlements')
  @Permissions('entitlements:read')
  entitlements() {
    return { entitlements: this.entitlementsService.listAll() };
  }

  @Post('entitlements/grant')
  @Permissions('admin:write')
  grant(@CurrentUser() user: CurrentUser, @Body() body: { auth0Subject: string; entitlementKey: string; sourceOrderId?: string }) {
    const entitlement = this.entitlementsService.grant({
      auth0Subject: body.auth0Subject,
      entitlementKey: body.entitlementKey,
      source: 'admin',
      sourceOrderId: body.sourceOrderId ?? `admin_${Date.now()}`,
    });
    this.auditService.record({
      actorAuth0Subject: user.sub,
      action: 'admin.entitlement.grant',
      targetType: 'entitlement',
      targetId: body.entitlementKey,
      metadata: { targetSubject: body.auth0Subject },
    });
    return { entitlement };
  }

  @Post('entitlements/revoke')
  @Permissions('admin:write')
  revoke(@CurrentUser() user: CurrentUser, @Body() body: { entitlementKey: string; auth0Subject: string }) {
    this.auditService.record({
      actorAuth0Subject: user.sub,
      action: 'admin.entitlement.revoke.requested',
      targetType: 'entitlement',
      targetId: body.entitlementKey,
      metadata: { targetSubject: body.auth0Subject },
    });
    return { status: 'queued_for_review' };
  }

  @Get('audit')
  @Permissions('admin:read')
  audit(@CurrentUser() user: CurrentUser) {
    this.auditService.record({ actorAuth0Subject: user.sub, action: 'admin.audit.read', targetType: 'audit' });
    return { audit: this.auditService.list() };
  }

  @Get('support/contact-messages')
  @Permissions('admin:read')
  contactMessages() {
    return { messages: [] };
  }

  @Patch('products/:id')
  @Permissions('admin:write')
  productUpdate(@CurrentUser() user: CurrentUser, @Param('id') id: string, @Body() body: Record<string, unknown>) {
    this.auditService.record({
      actorAuth0Subject: user.sub,
      action: 'admin.product.update',
      targetType: 'product',
      targetId: id,
      metadata: body,
    });
    return { status: 'accepted', id };
  }
}
