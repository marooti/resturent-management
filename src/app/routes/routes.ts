import { Routes } from '@angular/router';

export const dashData: Routes = [

    {
        path: 'dashboard',
        loadChildren: () => import('../pages/components/dashboard/dashboard-layout/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    },
    {
        path: 'about',
        loadChildren: () => import('../pages/components/about/about-routing.module').then(m => m.AboutRoutingModule),
    },
    {
        path: 'acitivity',
        loadChildren: () => import('../pages/components/activity/activity-routing.module').then(m => m.ActivityRoutingModule),
    },
]
