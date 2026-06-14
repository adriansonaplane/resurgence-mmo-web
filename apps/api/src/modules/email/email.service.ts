import { Injectable } from '@nestjs/common';

export interface QueuedEmail {
  id: string;
  provider: string;
  to: string;
  template: string;
  payload: Record<string, unknown>;
  status: 'queued';
  createdAt: string;
}

@Injectable()
export class EmailService {
  private readonly queue: QueuedEmail[] = [];

  queueEmail(input: Omit<QueuedEmail, 'id' | 'provider' | 'status' | 'createdAt'>) {
    const email: QueuedEmail = {
      ...input,
      id: `email_${this.queue.length + 1}`,
      provider: process.env.EMAIL_PROVIDER || 'placeholder',
      status: 'queued',
      createdAt: new Date().toISOString(),
    };
    this.queue.push(email);
    return email;
  }

  listQueued() {
    return [...this.queue];
  }
}
