import { Routes } from 'nest-router';
import { TourModule } from './modules/tour/tour.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    module: TourModule,
  },
];
