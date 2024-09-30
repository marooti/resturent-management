import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteService } from '@services/route.service';
import { ToastrService } from 'ngx-toastr';

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
  sidebarOpen = false;

  constructor(
    public routeService: RouteService,
    private toaster: ToastrService
  ) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    // Add your logout logic here
    this.toaster.success('Successfully Logout');
    console.log('Logged out');
  }
}
