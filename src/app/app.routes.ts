// OTHER IMPORTS
import { Routes } from '@angular/router';
import { RoutesEnum } from './commons/enums/routes.enum';

// COMPONENTS
import { PageNotFoundComponent } from './pages/components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminTimeSheetComponent } from './admin/layout/admin-time-sheet/admin-time-sheet.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { AddUsersComponent } from './admin/layout/add-users/add-users.component';

export const routes: Routes = [
    {
        path: RoutesEnum.LOGIN,
        loadComponent: () => import('./pages/components/public/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: RoutesEnum.SIGNUP,
        loadComponent: () => import('./pages/components/public/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: RoutesEnum.FORGOT_PASSWORD,
        loadComponent: () => import('./pages/components/public/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: RoutesEnum.DASHBOARD,
        loadComponent: () => import('./pages/components/dashboard/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent)
    },
    {
        path: RoutesEnum.CHECKING_DETAIL,
        loadComponent: () => import('./pages/components/checkingtime/checking-layout/checking-layout.component').then(m => m.CheckingLayoutComponent)
    },
    {
        path: RoutesEnum.ADMIN,
        loadComponent: () => import('./admin/layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'time-sheet', component: AdminTimeSheetComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'add-users', component: AddUsersComponent }
        ]
    },
    {
        path: RoutesEnum.SECURITY,
        loadComponent: () => import('./pages/components/security-layout/security-layout.component').then(m => m.SecurityLayoutComponent)
    },
    {
        path: RoutesEnum.SETTINGS,
        loadComponent: () => import('./pages/components/settings-layout/settings-layout.component').then(m => m.SettingsLayoutComponent)
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

// OTHER IMPORTS
// import { Routes } from '@angular/router';
// import { RoutesEnum } from './commons/enums/routes.enum';

// // COMPONENTS
// import { PageNotFoundComponent } from './pages/components/page-not-found/page-not-found.component';

// export const routes: Routes = [
//     {
//         path: 'auth',
//         loadComponent: () => import('./pages/components/public/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
//         children: [
//             {
//                 path: RoutesEnum.LOGIN,
//                 loadComponent: () => import('./pages/components/public/login/login.component').then(m => m.LoginComponent)
//             },
//             {
//                 path: RoutesEnum.SIGNUP,
//                 loadComponent: () => import('./pages/components/public/signup/signup.component').then(m => m.SignupComponent)
//             },
//             {
//                 path: RoutesEnum.FORGOT_PASSWORD,
//                 loadComponent: () => import('./pages/components/public/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
//             },
//             {
//                 path: '',
//                 redirectTo: RoutesEnum.LOGIN,
//                 pathMatch: 'full'
//             }
//         ]
//     },
//     {
//         path: RoutesEnum.DASHBOARD,
//         loadComponent: () => import('./pages/components/dashboard/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent)
//     },
//     {
//         path: RoutesEnum.MESSAGES,
//         loadComponent: () => import('./pages/components/messages-layout/messages-layout.component').then(m => m.MessagesLayoutComponent)
//     },
//     {
//         path: RoutesEnum.SECURITY,
//         loadComponent: () => import('./pages/components/security-layout/security-layout.component').then(m => m.SecurityLayoutComponent)
//     },
//     {
//         path: RoutesEnum.SETTINGS,
//         loadComponent: () => import('./pages/components/settings-layout/settings-layout.component').then(m => m.SettingsLayoutComponent)
//     },
//     {
//         path: '**',
//         redirectTo: '404'
//     },
//     {
//         path: '',
//         redirectTo: 'auth',
//     }
// ];