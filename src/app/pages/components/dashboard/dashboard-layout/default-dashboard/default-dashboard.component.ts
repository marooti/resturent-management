import { Component, OnInit } from '@angular/core';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { PrimengModule } from '../../../../../Shared/primeng.module';


@Component({
  selector: 'app-default-dashboard',
  standalone: true,
  imports: [PerformanceChartComponent,PrimengModule],
  templateUrl: './default-dashboard.component.html',
  styleUrl: './default-dashboard.component.scss'
})
export class DefaultDashboardComponent implements OnInit{
  tabItems!: MenuItem[];

  ngOnInit(): void {
    this.tabMenu();
  }

  tabMenu() {
    this.tabItems = [
      { label: 'Agent Dashboard', routerLink: ['/agent-dashboard'] },
      { label: 'Customer Feedback', routerLink: ['/dashboard'] },
      { label: 'Recent Activity', routerLink: ['/dashboard'] }
    ];
  }

}
