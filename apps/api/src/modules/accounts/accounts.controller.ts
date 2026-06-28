import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { AccountServiceClient } from '../account-service/account-service.client';
import { EntitlementsService } from '../entitlements/entitlements.service';
import { OrdersService } from '../orders/orders.service';

@ApiTags('account')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller()
export class AccountsController {
  constructor(
    private readonly accountServiceClient: AccountServiceClient,
    private readonly ordersService: OrdersService,
    private readonly entitlementsService: EntitlementsService,
  ) {}

  @Get('me')
  me(@CurrentUser() user: CurrentUser) {
    return { user };
  }

  @Get('account/dashboard')
  dashboard(@CurrentUser() user: CurrentUser) {
    return {
      profile: { subject: user.sub, email: user.email, roles: user.roles },
      characters: [
        { externalCharacterId: 'preview-barbarian', name: 'Rook', className: 'Barbarian', level: 12 },
      ],
      purchases: this.ordersService.listForUser(user.sub),
      entitlements: this.entitlementsService.listForUser(user.sub),
    };
  }

  @Get('account/profile')
  profile(@CurrentUser() user: CurrentUser) {
    return { profile: { subject: user.sub, email: user.email, displayName: user.email?.split('@')[0] ?? 'Player' } };
  }

  @Patch('account/profile')
  updateProfile(@CurrentUser() user: CurrentUser, @Body() body: { displayName?: string }) {
    return { profile: { subject: user.sub, displayName: body.displayName ?? 'Player' } };
  }

  @Get('account/purchases')
  purchases(@CurrentUser() user: CurrentUser) {
    return { purchases: this.ordersService.listForUser(user.sub) };
  }

  @Get('account/status')
  status(@CurrentUser() user: CurrentUser) {
    return { status: this.accountServiceClient.getAccountStatus(user.sub) };
  }

  @Get('account/linked-accounts')
  linkedAccounts(@CurrentUser() user: CurrentUser) {
    return { linkedAccounts: this.accountServiceClient.getLinkedAccounts(user.sub) };
  }

  @Get('account/security')
  security(@CurrentUser() user: CurrentUser) {
    return { security: this.accountServiceClient.getSecuritySummary(user.sub) };
  }

  @Post('account/recovery/start')
  startRecovery(@CurrentUser() user: CurrentUser) {
    return { recovery: this.accountServiceClient.startAccountRecovery(user.sub) };
  }

  @Post('account/game-session/request-placeholder')
  requestGameSessionPlaceholder(@CurrentUser() user: CurrentUser) {
    return { gameSession: this.accountServiceClient.requestGameSessionPlaceholder(user.sub) };
  }
}
