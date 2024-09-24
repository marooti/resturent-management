import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouteService } from '@services/route.service';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  sidebarOpen = false;
  tooltipVisible = false;
  constructor(
    public routeService: RouteService,
  ) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
  logout() {
    // Add your logout logic here
    console.log('Logged out');
  }
}
