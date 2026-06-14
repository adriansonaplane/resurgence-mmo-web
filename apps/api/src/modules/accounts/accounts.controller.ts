import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { EntitlementsService } from '../entitlements/entitlements.service';
import { OrdersService } from '../orders/orders.service';

@ApiTags('account')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller()
export class AccountsController {
  constructor(
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
}
