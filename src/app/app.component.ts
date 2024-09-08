import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectSidebarComponent } from './pages/components/project-sidebar/project-sidebar.component';
import { HeaderComponent } from './pages/components/public/header/header.component';
import { AmazonConnectService } from '@services/amazonConnectService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectSidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Omni-Interact';
  @ViewChild('ccpElement') ccpElement!: ElementRef;
  showCcp = false;
  isLoggedIn = false;

  constructor(private router: Router, private amazonConnectService: AmazonConnectService) { }

  ngAfterViewInit(): void {
    // Initialize CCP if not already done in LoginComponent
    if (!this.isLoggedIn) {
      this.initializeCCP();
    }
  }

  initializeCCP(): void {
    this.amazonConnectService.initializeCCP(this.ccpElement.nativeElement).catch((err: any) => {
      console.error('Error initializing CCP:', err);
    });
  }

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
