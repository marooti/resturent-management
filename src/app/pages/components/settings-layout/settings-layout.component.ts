import { Component } from '@angular/core';
import { ProjectSidebarComponent } from '../project-sidebar/project-sidebar.component';

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [
    ProjectSidebarComponent,
  ],
  templateUrl: './settings-layout.component.html',
  styleUrl: './settings-layout.component.scss'
})
export class SettingsLayoutComponent {

}
