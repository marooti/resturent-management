import { Component, OnInit } from '@angular/core';
import { ProjectSidebarComponent } from '../../project-sidebar/project-sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../../public/header/header.component';
import { CheckingDetailComponent } from "../checking-detail/checking-detail.component";
import { CommonModule } from '@angular/common';
import { Navigation, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouteService } from '@services/route.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    ProjectSidebarComponent,
    DashboardComponent,
    HeaderComponent,
    CheckingDetailComponent
],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit { 

  constructor(private router: Router) {}

  // Method to check if the current route is "dashboard"
  isDashboardRoute(): boolean {
    return this.router.url === '/dashboard';
  }

  // Method to check if the current route is "checking-time"
  isCheckingDetailRoute(): boolean {
    return this.router.url === '/checking-detail';
  }

  ngOnInit(): void {
    
  }
}