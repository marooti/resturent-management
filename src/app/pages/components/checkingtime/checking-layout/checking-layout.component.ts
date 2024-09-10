import { Component } from '@angular/core';
import { ProjectSidebarComponent } from "../../project-sidebar/project-sidebar.component";
import { CheckingDetailComponent } from "../../dashboard/checking-detail/checking-detail.component";

@Component({
  selector: 'app-checking-layout',
  standalone: true,
  imports: [ProjectSidebarComponent, CheckingDetailComponent],
  templateUrl: './checking-layout.component.html',
  styleUrl: './checking-layout.component.scss'
})
export class CheckingLayoutComponent {

}
