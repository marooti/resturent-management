import { Component } from '@angular/core';
import { ProjectSidebarComponent } from '../project-sidebar/project-sidebar.component';

@Component({
  selector: 'app-messages-layout',
  standalone: true,
  imports: [
    ProjectSidebarComponent,
  ],
  templateUrl: './messages-layout.component.html',
  styleUrl: './messages-layout.component.scss'
})
export class MessagesLayoutComponent {

}
