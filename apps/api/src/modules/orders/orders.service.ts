import { Injectable } from '@nestjs/common';

export interface OrderRecord {
  id: string;
  auth0Subject: string;
  stripeCheckoutSessionId: string;
  status: string;
  productSlug: string;
  entitlementKey: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, OrderRecord>();

  createFromCheckout(input: Omit<OrderRecord, 'id' | 'createdAt'>) {
    const existing = this.orders.get(input.stripeCheckoutSessionId);
    if (existing) return existing;
    const record = {
      ...input,
      id: `order_${this.orders.size + 1}`,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(input.stripeCheckoutSessionId, record);
    return record;
  }

  listForUser(auth0Subject: string) {
    return [...this.orders.values()].filter((order) => order.auth0Subject === auth0Subject);
  }

  listAll() {
    return [...this.orders.values()];
  }
}
