import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';

@ApiTags('support')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('support/tickets')
export class SupportController {
  private readonly tickets: Array<{ id: string; auth0Subject: string; subject: string; body: string; status: string }> = [];

  @Get()
  list(@CurrentUser() user: CurrentUser) {
    return { tickets: this.tickets.filter((ticket) => ticket.auth0Subject === user.sub) };
  }

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() body: { subject: string; body: string }) {
    const ticket = {
      id: `ticket_${this.tickets.length + 1}`,
      auth0Subject: user.sub,
      subject: body.subject,
      body: body.body,
      status: 'open',
    };
    this.tickets.push(ticket);
    return { ticket };
  }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() user: CurrentUser) {
    return { ticket: this.tickets.find((ticket) => ticket.id === id && ticket.auth0Subject === user.sub) ?? null };
  }
}
