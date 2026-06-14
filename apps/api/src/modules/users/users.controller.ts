import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('users')
export class UsersController {
  @Get('profile-sync-preview')
  preview(@CurrentUser() user: CurrentUser) {
    return { auth0Subject: user.sub, localProfileStatus: 'sync-ready' };
  }
}
