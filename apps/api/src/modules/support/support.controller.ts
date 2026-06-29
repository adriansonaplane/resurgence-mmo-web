import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { SupportService } from './support.service';

@ApiTags('support')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Public()
  @Get('articles')
  articles() {
    return this.supportService.listArticles();
  }

  @Public()
  @Get('known-issues')
  knownIssues() {
    return this.supportService.listKnownIssues();
  }

  @Get('tickets')
  list(@CurrentUser() user: CurrentUser) {
    return { tickets: this.supportService.listTickets(user.sub) };
  }

  @Post('tickets')
  create(@CurrentUser() user: CurrentUser, @Body() body: { subject: string; body: string }) {
    return { ticket: this.supportService.createTicket(user.sub, body) };
  }

  @Get('tickets/:id')
  get(@Param('id') id: string, @CurrentUser() user: CurrentUser) {
    return { ticket: this.supportService.findTicket(id, user.sub) };
  }

  @Post('bug-reports')
  createBugReport(@CurrentUser() user: CurrentUser, @Body() body: Record<string, unknown>) {
    return { bugReport: this.supportService.createBugReport(user.sub, body) };
  }

  @Post('ban-appeals')
  createBanAppeal(@CurrentUser() user: CurrentUser, @Body() body: Record<string, unknown>) {
    return { banAppeal: this.supportService.createBanAppeal(user.sub, body) };
  }

  @Post('account-recovery-requests')
  createAccountRecoveryRequest(@CurrentUser() user: CurrentUser, @Body() body: Record<string, unknown>) {
    return { accountRecoveryRequest: this.supportService.createAccountRecoveryRequest(user.sub, body) };
  }
}
