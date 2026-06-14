import { Injectable, NotFoundException } from '@nestjs/common';
import { productSeed } from '../../database/seeds/products';

export type StoreProduct = (typeof productSeed)[number];

@Injectable()
export class ProductsService {
  private readonly products = productSeed;

  findVisible() {
    return this.products.filter((product) => product.isVisible && product.isActive);
  }

  findVisibleBySlug(slug: string) {
    const product = this.findVisible().find((item) => item.slug === slug);
    if (!product) throw new NotFoundException('Product could not be found.');
    return product;
  }
}
