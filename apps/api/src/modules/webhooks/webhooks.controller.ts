import { Controller, Headers, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { Public } from '../../common/decorators/public.decorator';
import { WebhooksService } from './webhooks.service';

@ApiTags('webhooks')
@Public()
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('stripe')
  handleStripe(@Req() request: FastifyRequest & { rawBody?: Buffer }, @Headers('stripe-signature') signature?: string) {
    const rawBody = request.rawBody ?? Buffer.from(JSON.stringify(request.body ?? {}));
    return this.webhooksService.processStripeWebhook(rawBody, signature);
  }
}
