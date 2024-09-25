import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectServiceService } from '@services/project-service/project-service.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DialogModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  profileData: any;
  locathostData: any;
  visible = false;
  projectId: any;
  projectName: any;
  description: any;
  constructor(private projectService: ProjectServiceService) { }

  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData)
  }

  postProjectData() {
    const projectId = this.projectId;  // Document ID
    const projectData = {
      id: this.projectId,
      name: this.projectName,
      description: this.description,
    };

    this.projectService.addProjectData(projectId, projectData)
      .then((data) => {
        console.log('Project posted successfully', data);
        this.visible = false;
      })
      .catch((error) => console.error('Error posting project: ', error));
  }
}
