import { Controller, Get, Headers, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { EntitlementsService } from './entitlements.service';

@ApiTags('entitlements')
@Controller('account/entitlements')
export class EntitlementsController {
  constructor(private readonly entitlementsService: EntitlementsService) {}

  @UseGuards(Auth0Guard)
  @Get()
  listForAccount(@CurrentUser() user: CurrentUser) {
    return { entitlements: this.entitlementsService.listForUser(user.sub) };
  }
}

@ApiTags('entitlement-bridge')
@Controller('entitlements/bridge')
export class EntitlementBridgeController {
  constructor(private readonly entitlementsService: EntitlementsService) {}

  @Get()
  listForGameBackend(@Headers('x-game-service-token') token: string | undefined, @Headers('x-auth0-subject') subject: string | undefined) {
    if (!process.env.GAME_BACKEND_SERVICE_TOKEN || token !== process.env.GAME_BACKEND_SERVICE_TOKEN) {
      throw new UnauthorizedException('Game backend service token is required.');
    }
    return { entitlements: this.entitlementsService.listForUser(subject ?? '') };
  }
}
