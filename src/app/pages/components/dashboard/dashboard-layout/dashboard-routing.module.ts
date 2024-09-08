import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { PerformanceChartComponent } from './default-dashboard/performance-chart/performance-chart.component';

const routes: Routes = [
  { path: '', component: DefaultDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'agent-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'agent-dashboard',
        component: PerformanceChartComponent
      }
    ],

   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
