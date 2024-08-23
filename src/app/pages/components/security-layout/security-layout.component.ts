import { Component } from '@angular/core';
import { ProjectSidebarComponent } from '../project-sidebar/project-sidebar.component';

@Component({
  selector: 'app-security-layout',
  standalone: true,
  imports: [
    ProjectSidebarComponent,
  ],
  templateUrl: './security-layout.component.html',
  styleUrl: './security-layout.component.scss'
})
export class SecurityLayoutComponent {

}
