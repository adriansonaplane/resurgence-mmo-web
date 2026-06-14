import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  private readonly messages: Array<CreateContactMessageDto & { id: string; createdAt: string }> = [];

  constructor(private readonly emailService: EmailService) {}

  create(dto: CreateContactMessageDto) {
    const message = { ...dto, id: `contact_${this.messages.length + 1}`, createdAt: new Date().toISOString() };
    this.messages.push(message);
    this.emailService.queueEmail({
      to: dto.email,
      template: 'contact-message-received',
      payload: {
        contactMessageId: message.id,
        subject: dto.subject,
      },
    });
    return message;
  }

  list() {
    return [...this.messages].reverse();
  }
}
