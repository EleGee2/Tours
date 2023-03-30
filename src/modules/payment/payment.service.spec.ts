import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { BookingService } from '../tour/services/booking.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  const mockBookingService = {
    getBookingByQuery: jest.fn(),
    updateBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, BookingService],
    })
      .overrideProvider(BookingService)
      .useValue(mockBookingService)
      .compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initiateFlutterwave', () => {
    it('should initiate a flutterwave payment and return payment link', async () => {
      const data = { amount: 1, currency: 'USD' };
      const paymentLink = 'https://example.com/payment-link';

      jest.spyOn(service, 'initiateFlutterwave').mockResolvedValue(paymentLink);

      const result = await service.initiateFlutterwave(data);

      expect(result).toEqual(paymentLink);
    });
  });

  describe('handleSuccessfulFlutterwaveWebhook', () => {
    const mockWebhookData = {
      tx_ref: '12345',
    };

    it('should successfully handle flutterwave webhook', async () => {
      const mockBooking = {
        id: 'demo-id',
        tx_ref: 'demo-reference',
        status: 'pending',
        paid: false,
      };

      const mockUpdateBooking = {
        ...mockBooking,
        status: 'success',
        paid: true,
      };
      mockBookingService.getBookingByQuery.mockResolvedValueOnce(mockBooking);
      mockBookingService.updateBooking.mockResolvedValueOnce(mockUpdateBooking);

      const result = await service.handleSuccessfulFlutterwaveWebhook(
        mockWebhookData,
      );

      expect(mockBookingService.getBookingByQuery).toHaveBeenCalledWith({
        reference: mockWebhookData.tx_ref,
      });
      expect(mockBookingService.updateBooking).toHaveBeenCalledWith(
        mockBooking.id,
        { status: 'success', paid: true },
      );
      expect(result).toEqual(mockUpdateBooking);
    });

    it('should fail to handle webhook if booking is not found', async () => {
      mockBookingService.getBookingByQuery.mockResolvedValueOnce(null);

      await expect(
        service.handleSuccessfulFlutterwaveWebhook(mockWebhookData),
      ).rejects.toThrow(NotFoundException);
      expect(mockBookingService.getBookingByQuery).toHaveBeenCalledWith({
        reference: mockWebhookData.tx_ref,
      });
    });
  });

  describe('handleCancelledFlutterwaveWebhook', () => {
    const mockWebhookData = {
      tx_ref: '12345',
    };

    it('should successfully handle canceled webhook', async () => {
      const mockBooking = {
        id: 'demo-id',
        tx_ref: 'demo-reference',
        status: 'pending',
        paid: false,
      };

      const mockUpdateBooking = {
        ...mockBooking,
        status: 'failed',
        paid: false,
      };

      mockBookingService.getBookingByQuery.mockResolvedValueOnce(mockBooking);
      mockBookingService.updateBooking.mockResolvedValueOnce(mockUpdateBooking);

      const result = await service.handleCancelledFlutterwaveWebhook(
        mockWebhookData,
      );

      expect(mockBookingService.getBookingByQuery).toHaveBeenCalledWith({
        reference: mockWebhookData.tx_ref,
      });
      expect(result).toEqual(mockUpdateBooking);
    });

    it('should fail to handle cancelled webhook if booking is not found', async () => {
      mockBookingService.getBookingByQuery.mockResolvedValueOnce(null);
      mockBookingService.updateBooking.mockResolvedValueOnce(null);

      await expect(
        service.handleCancelledFlutterwaveWebhook(mockWebhookData),
      ).rejects.toThrow(NotFoundException);
      expect(mockBookingService.getBookingByQuery).toHaveBeenCalledWith({
        reference: mockWebhookData.tx_ref,
      });
    });
  });
});
