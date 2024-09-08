import { Routes } from '@angular/router';
import { RoutesEnum } from './commons/enums/routes.enum';
import { DashboardLayoutComponent } from './pages/components/dashboard/dashboard-layout/dashboard-layout.component';
import { dashData } from './routes/routes';

export const routes: Routes = [
  {
    path: RoutesEnum.Login,
    loadComponent: () =>
      import('./pages/components/public/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: dashData,

  },

  {
    path: '**',
    redirectTo: '404',
  },
];
