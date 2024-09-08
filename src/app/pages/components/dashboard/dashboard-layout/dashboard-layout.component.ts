import { Component } from '@angular/core';
import { ProjectSidebarComponent } from '../../project-sidebar/project-sidebar.component';
import { HeaderComponent } from '../../public/header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    ProjectSidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent { }