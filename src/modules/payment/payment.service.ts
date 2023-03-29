import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { initiateFlutterwavePayment } from './providers/flutterwave.payment';
import { BookingService } from '../tour/services/booking.service';
import { BookingStatus } from '../tour/entities/booking.entity';
import { UpdateBookingDto } from '../tour/dto/update-booking.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(forwardRef(() => BookingService))
    private readonly bookingService: BookingService,
  ) {}
  async initiateFlutterwave(paymentData) {
    return await initiateFlutterwavePayment(paymentData);
  }

  async handleSuccessfulFlutterwaveWebhook(webhookData) {
    console.log(webhookData);
    const booking = await this.bookingService.getBookingByQuery({
      reference: webhookData.tx_ref,
    });

    if (!booking) throw new NotFoundException('Booking not found');

    return await this.bookingService.updateBooking(booking.id, <
      UpdateBookingDto
    >{ status: BookingStatus.SUCCESS, paid: true });
  }

  async handleCancelledFlutterwaveWebhook(webhookData) {
    console.log(webhookData);
    const booking = await this.bookingService.getBookingByQuery({
      reference: webhookData.tx_ref,
    });

    if (!booking) throw new NotFoundException('Booking not found');

    return await this.bookingService.updateBooking(booking.id, <
      UpdateBookingDto
    >{ status: BookingStatus.FAILED });
  }
}
