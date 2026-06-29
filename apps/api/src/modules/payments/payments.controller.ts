import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Auth0Guard } from '../../common/guards/auth0.guard';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout-session')
  createCheckoutSession(@Body() dto: CreateCheckoutSessionDto, @CurrentUser() user: CurrentUser) {
    return this.paymentsService.createCheckoutSession(dto.productSlug, user);
  }

  @Post('customer-portal')
  createCustomerPortal() {
    return this.paymentsService.createCustomerPortal();
  }

  @Post('mock-complete')
  createMockCompletedPurchase(@Body() dto: CreateCheckoutSessionDto, @CurrentUser() user: CurrentUser) {
    return this.paymentsService.createMockCompletedPurchase(dto.productSlug, user);
  }
}
