import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectSidebarComponent } from '../../project-sidebar/project-sidebar.component';
import { HeaderComponent } from '../../public/header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectSidebarComponent, HeaderComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent { }
