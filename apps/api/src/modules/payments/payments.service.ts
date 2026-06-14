import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ProductsService } from '../products/products.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

  constructor(private readonly productsService: ProductsService) {}

  async createCheckoutSession(productSlug: string, user: CurrentUser) {
    const product = this.productsService.findVisibleBySlug(productSlug);
    if (!product.stripePriceId) throw new BadRequestException('Product has no active Stripe price.');

    const successUrl = process.env.STRIPE_SUCCESS_URL ?? 'http://localhost:4200/store/success';
    const cancelUrl = process.env.STRIPE_CANCEL_URL ?? 'http://localhost:4200/store/cancel';

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return {
        id: 'cs_test_placeholder',
        url: `${successUrl}?session_id=cs_test_placeholder`,
        grantsEntitlement: false,
      };
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      client_reference_id: user.sub,
      customer_email: user.email,
      metadata: {
        auth0Subject: user.sub,
        productSlug: product.slug,
        entitlementKey: product.entitlementKey,
      },
    });

    return {
      id: session.id,
      url: session.url,
      grantsEntitlement: false,
    };
  }

  createCustomerPortal() {
    return {
      url: process.env.APP_PUBLIC_URL ? `${process.env.APP_PUBLIC_URL}/account/billing` : 'http://localhost:4200/account/billing',
      placeholder: true,
    };
  }
}
