import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { ProductsService } from '../products/products.service';

@ApiTags('storefront')
@Public()
@Controller('store')
export class StorefrontController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  listProducts() {
    return { products: this.productsService.findVisible() };
  }

  @Get('products/:slug')
  getProduct(@Param('slug') slug: string) {
    return { product: this.productsService.findVisibleBySlug(slug) };
  }

  @Get('categories')
  listCategories() {
    return { categories: [{ slug: 'access', name: 'Game Access' }] };
  }
}
