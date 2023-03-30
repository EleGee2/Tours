import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;
  const mockPaymentService = {
    handleCancelledFlutterwaveWebhook: jest.fn((dto) => {
      return { id: 'demo-id', ...dto };
    }),
    handleSuccessfulFlutterwaveWebhook: jest.fn((dto) => {
      return { id: 'demo-id', ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    })
      .overrideProvider(PaymentService)
      .useValue(mockPaymentService)
      .compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleCancelWebhook', () => {
    it('should handle cancel webhook', async () => {
      expect(
        await controller.handleCancelWebhook({ tx_ref: 'demo-reference' }),
      ).toEqual({
        id: 'demo-id',
        tx_ref: 'demo-reference',
      });
      expect(
        mockPaymentService.handleCancelledFlutterwaveWebhook,
      ).toHaveBeenCalled();
    });
  });

  describe('handleSuccessWebhook', () => {
    it('should handle flutterwave success webhook', async () => {
      expect(
        await controller.handleSuccessWebhook({
          tx_ref: 'demo-reference',
          status: 'successful',
        }),
      ).toEqual({
        id: 'demo-id',
        tx_ref: 'demo-reference',
        status: 'successful',
      });
    });
  });
});
