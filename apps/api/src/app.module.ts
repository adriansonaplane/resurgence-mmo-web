import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { CharactersModule } from './modules/characters/characters.module';
import { ContactModule } from './modules/contact/contact.module';
import { ContentModule } from './modules/content/content.module';
import { DatabaseModule } from './database/database.module';
import { DirectusModule } from './modules/directus/directus.module';
import { EntitlementsModule } from './modules/entitlements/entitlements.module';
import { EmailModule } from './modules/email/email.module';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProductsModule } from './modules/products/products.module';
import { StorefrontModule } from './modules/storefront/storefront.module';
import { SupportModule } from './modules/support/support.module';
import { UsersModule } from './modules/users/users.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    CharactersModule,
    StorefrontModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    ProfileModule,
    WebhooksModule,
    EntitlementsModule,
    EmailModule,
    NewsModule,
    ContactModule,
    ContentModule,
    SupportModule,
    AdminModule,
    AuditModule,
    HealthModule,
    DirectusModule,
  ],
})
export class AppModule {}
