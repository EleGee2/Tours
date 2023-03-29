import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/flw-webhook')
  async handleCancelWebhook(@Query() query) {
    return await this.paymentService.handleCancelledFlutterwaveWebhook(query);
  }

  @Post('/flw-webhook')
  async handleSuccessWebhook(@Body() body) {
    return await this.paymentService.handleSuccessfulFlutterwaveWebhook(body);
  }
}
