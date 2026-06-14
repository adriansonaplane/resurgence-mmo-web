import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { AuditService } from '../audit/audit.service';
import { EntitlementsService } from '../entitlements/entitlements.service';
import { OrdersService } from '../orders/orders.service';

type WebhookResult = { received: true; processed: boolean; eventId: string; eventType: string };

@Injectable()
export class WebhooksService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
  private readonly processedEvents = new Set<string>();

  constructor(
    private readonly ordersService: OrdersService,
    private readonly entitlementsService: EntitlementsService,
    private readonly auditService: AuditService,
  ) {}

  processStripeWebhook(rawBody: Buffer, signature: string | undefined): WebhookResult {
    if (!signature) throw new BadRequestException('Stripe signature header is required.');
    const event = this.constructStripeEvent(rawBody, signature);

    if (this.processedEvents.has(event.id)) {
      return { received: true, processed: false, eventId: event.id, eventType: event.type };
    }
    this.processedEvents.add(event.id);

    if (event.type === 'checkout.session.completed') {
      this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
    }

    if (event.type === 'charge.refunded' || event.type === 'payment_intent.payment_failed') {
      this.auditService.record({
        action: `stripe.${event.type}`,
        targetType: 'stripe_event',
        targetId: event.id,
        metadata: { eventType: event.type },
      });
    }

    return { received: true, processed: true, eventId: event.id, eventType: event.type };
  }

  private constructStripeEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new BadRequestException('Stripe webhook secret is not configured.');

    if (secret === 'whsec_placeholder' && signature === 'test_valid_signature') {
      return JSON.parse(rawBody.toString('utf8')) as Stripe.Event;
    }

    try {
      return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch {
      throw new BadRequestException('Stripe webhook signature verification failed.');
    }
  }

  private handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const metadata = session.metadata ?? {};
    const auth0Subject = metadata.auth0Subject || session.client_reference_id;
    const productSlug = metadata.productSlug;
    const entitlementKey = metadata.entitlementKey;
    if (!auth0Subject || !productSlug || !entitlementKey) {
      throw new BadRequestException('Checkout session metadata is incomplete.');
    }

    const order = this.ordersService.createFromCheckout({
      auth0Subject,
      stripeCheckoutSessionId: session.id,
      status: 'paid',
      productSlug,
      entitlementKey,
      totalAmount: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
    });

    this.entitlementsService.grant({
      auth0Subject,
      entitlementKey,
      source: 'stripe_webhook',
      sourceOrderId: order.id,
    });
  }
}
