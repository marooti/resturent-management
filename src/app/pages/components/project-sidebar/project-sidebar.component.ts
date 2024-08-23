import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteService } from '@services/route.service';

@Component({
  selector: 'app-project-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.scss']
})
export class ProjectSidebarComponent {
  sidebarOpen = true;

  constructor(
    public routeService: RouteService,
  ) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    // Add your logout logic here
    console.log('Logged out');
  }
}
