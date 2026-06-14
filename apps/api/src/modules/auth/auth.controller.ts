import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';

@ApiTags('auth')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('auth')
export class AuthController {
  @Get('session')
  session(@CurrentUser() user: CurrentUser) {
    return { user };
  }
}
