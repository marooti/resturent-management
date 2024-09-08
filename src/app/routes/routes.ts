import { Routes } from '@angular/router';

export const dashData: Routes = [

    {
        path: 'dashboard',
        loadChildren: () => import('../pages/components/dashboard/dashboard-layout/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    },
  
    {
        path: 'setting',
        loadChildren: () => import('../pages/components/setting/setting-routing.module').then(m => m.SettingRoutingModule),
    },
    {
        path: 'all-chat',
        loadChildren: () => import('../pages/components/all-chat/all-chat-routing.module').then(m => m.AllChatRoutingModule),
    },
    {
        path: 'home',
        loadChildren: () => import('../../app/pages/components/Home/home-routing.module').then(m => m.HomeRoutingModule),
    },
]
