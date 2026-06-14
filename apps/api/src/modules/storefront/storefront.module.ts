import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { StorefrontController } from './storefront.controller';

@Module({
  imports: [ProductsModule],
  controllers: [StorefrontController],
})
export class StorefrontModule {}
