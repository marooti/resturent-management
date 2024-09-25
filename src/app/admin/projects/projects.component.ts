import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectServiceService } from '@services/project-service/project-service.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DialogModule } from 'primeng/dialog';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    TableModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    ProgressSpinnerModule
  ],
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
  projects$: Observable<any[]>;
  allProjectName: any;
  filterData: any;
  projectfilter: any;

  constructor(private projectService: ProjectServiceService, private firestore: Firestore) {
    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.getproducts();
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

  getproducts() {
    this.projects$.subscribe(data => {
      this.allProjectName = data;
      this.filterData = data;
      console.log("All Data:", this.allProjectName);
    });
  }

  searchRecord() {
    console.log("Search");
    const value = this.filterData.filter((data: any) => data.name === this.projectfilter);
    this.allProjectName = value;

  }
}
