import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '@services/firestore.service';
import { ProjectServiceService } from '@services/project-service/project-service.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserSerivceService } from '@services/user-service/user-serivce.service';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [DropdownModule, FormsModule, CommonModule, DialogModule
    , FormsModule,
    TableModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    CommonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent {
  profileData: any;
  locathostData: any;
  filterData: any;
  projectfilter: any;
  projects$: Observable<any[]>
  visible = false;

  gender: any[] = [
    {
      gendar: 'male'
    },
    {
      gendar: 'female'
    },
  ]
  profileForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
    officeRole: new FormControl(''),
    department: new FormControl(''),
    phoneNo: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.getAllUserProfiles();
  }

  constructor(
    private projectService: ProjectServiceService
    , private firestore: Firestore
    , private firestoreService: FirestoreService
    , private userService: UserSerivceService
  ) {
    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  getAllUserProfiles() {
    this.firestoreService.getAllUser().subscribe(
      (data) => {
        console.log("this value:", data);
        this.filterData = data;
      });
  }



  postProjectData() {
    console.log(this.profileForm.value['role']);
    const value = this.profileForm.value['role'];
    const projectId = value;
    const projectData = {
      name: this.profileForm.value['name'],
      gender: this.profileForm.value['gender'],
      email: this.profileForm.value['email'],
      role: this.profileForm.value['role'],
      phoneNo: this.profileForm.value['phoneNo'],
      password: this.profileForm.value['password'],
      department: this.profileForm.value['department'],
      officeRole: this.profileForm.value['officeRole'],
      username: this.profileForm.value['role'],
    };

    this.userService.addUserData(projectId, projectData)
      .then((data) => {
        console.log('Project posted successfully', data);
        this.visible = false;
      })
      .catch((error) => console.error('Error posting project: ', error));
  }

  patchForm(data: any) {
    this.visible = true;
    console.log("this is value", data);
    this.profileForm.patchValue(data);
    // this
  }
}
