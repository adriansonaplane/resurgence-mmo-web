import { Injectable } from '@nestjs/common';

export interface SupportTicket {
  id: string;
  auth0Subject: string;
  subject: string;
  body: string;
  status: string;
}

@Injectable()
export class SupportService {
  private readonly tickets: SupportTicket[] = [];
  private readonly bugReports: Array<Record<string, unknown>> = [];
  private readonly banAppeals: Array<Record<string, unknown>> = [];
  private readonly accountRecoveryRequests: Array<Record<string, unknown>> = [];

  listTickets(auth0Subject?: string) {
    return auth0Subject ? this.tickets.filter((ticket) => ticket.auth0Subject === auth0Subject) : [...this.tickets];
  }

  createTicket(auth0Subject: string, body: { subject: string; body: string }) {
    const ticket = {
      id: `ticket_${this.tickets.length + 1}`,
      auth0Subject,
      subject: body.subject,
      body: body.body,
      status: 'open',
    };
    this.tickets.push(ticket);
    return ticket;
  }

  findTicket(id: string, auth0Subject?: string) {
    return this.tickets.find((ticket) => ticket.id === id && (!auth0Subject || ticket.auth0Subject === auth0Subject)) ?? null;
  }

  updateTicket(id: string, body: { status?: string }) {
    const ticket = this.findTicket(id);
    if (!ticket) return null;
    ticket.status = body.status ?? ticket.status;
    return ticket;
  }

  listArticles() {
    return {
      articles: [
        {
          slug: 'account-access',
          title: 'Account Access',
          summary: 'Use local mock login buttons until Auth0 is provisioned.',
        },
      ],
      sourceOfTruth: 'Directus',
    };
  }

  listKnownIssues() {
    return {
      knownIssues: [
        {
          slug: 'mock-services',
          title: 'Mock services are enabled',
          summary: 'Local mock services simulate provisioned integrations for development.',
        },
      ],
      sourceOfTruth: 'Directus',
    };
  }

  createBugReport(auth0Subject: string, body: Record<string, unknown>) {
    const report = {
      id: `bug_${this.bugReports.length + 1}`,
      auth0Subject,
      status: 'new',
      sourceOfTruth: 'website database',
      ...body,
    };
    this.bugReports.push(report);
    return report;
  }

  createBanAppeal(auth0Subject: string, body: Record<string, unknown>) {
    const appeal = {
      id: `ban_appeal_${this.banAppeals.length + 1}`,
      auth0Subject,
      status: 'submitted',
      sourceOfTruth: 'Account Service',
      ...body,
    };
    this.banAppeals.push(appeal);
    return appeal;
  }

  listBanAppeals() {
    return [...this.banAppeals];
  }

  createAccountRecoveryRequest(auth0Subject: string, body: Record<string, unknown>) {
    const request = {
      id: `account_recovery_${this.accountRecoveryRequests.length + 1}`,
      auth0Subject,
      status: 'submitted',
      sourceOfTruth: 'Account Service',
      ...body,
    };
    this.accountRecoveryRequests.push(request);
    return request;
  }
}
