import { Routes } from 'nest-router';
import { TourModule } from './modules/tour/tour.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentModule } from "./modules/payment/payment.module";

export const routes: Routes = [
  {
    path: '/api/v1',
    module: TourModule,
  },
  {
    path: 'api/v1/',
    module: UserModule,
  },
  {
    path: 'api/v1/',
    module: AuthModule,
  },
  {
    path: 'api/v1/',
    module: PaymentModule,
  },
];
