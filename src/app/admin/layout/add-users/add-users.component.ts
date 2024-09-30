import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ToastrService } from '@services/toastr.service';

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
  profileForm!: FormGroup
  profileData: any;
  locathostData: any;
  filterData: any;
  projectfilter: any;
  projects$: Observable<any[]>
  visible = false;
  update = false;
  allData: any;
  username: any;
  gender: any[] = [
    {
      gendar: 'male'
    },
    {
      gendar: 'female'
    },
  ]

  department: any[] = [
    {
      department: 'Accounts'
    },
    {
      department: 'Mobile Application Development'
    },
    {
      department: 'Digital Marketing'
    },
    {
      department: 'Web Development'
    },
    {
      department: 'Quality Assurance'
    },
    {
      department: 'Human Resource'
    },
    {
      department: 'Wordpress'
    },
    {
      department: 'Management'
    },
  ]


  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.getAllUserProfiles();
    this.createForm();
  }

  constructor(
    private projectService: ProjectServiceService
    , private firestore: Firestore
    , private firestoreService: FirestoreService
    , private userService: UserSerivceService
    , private fb: FormBuilder
    , private toaster: ToastrService
  ) {
    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: [undefined, [Validators.required]],
      gender: [undefined, [Validators.required]],
      designation: [undefined, [Validators.required]],
      department: [undefined, [Validators.required]],
      phoneNo: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      role: [undefined],
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });
  }

  getAllUserProfiles() {
    this.firestoreService.getAllUser().subscribe(
      (data) => {
        console.log("this value:", data);
        this.filterData = data;
        this.allData = data;
      });
  }



  postProjectData() {
    console.log(this.profileForm.value['username']);

    if (this.profileForm.invalid) {
      this.toaster.showError('Please fill out all asterisk fields');
      return;
    }
    const mail = this.profileForm.value['email'];
    console.log("this is mail", mail);
    const emailAlready: any = this.allData.filter((data: any) => data.email === mail);
    console.log("this is mail afre", mail);

    if (emailAlready.length === 1) {
      this.toaster.showError('This Email Already exist');
      return;

    }
    const roleMail = this.profileForm.value['username'];
    console.log("this is mail", mail);
    const roleMailAlready: any = this.allData.filter((data: any) => data.role === roleMail);
    if (roleMailAlready.length === null) {
      this.toaster.showError('This User Already');
      return;

    }
    const projectId = this.profileForm.value['username'];
    const projectData = {
      name: this.profileForm.value['name'],
      gender: this.profileForm.value['gender'],
      email: this.profileForm.value['email'],
      role: this.profileForm.value['role'],
      phoneNo: this.profileForm.value['phoneNo'],
      password: this.profileForm.value['password'],
      department: this.profileForm.value['department'],
      designation: this.profileForm.value['designation'],
      username: this.profileForm.value['username'],
    };

    this.userService.addUserData(projectId, projectData)
      .then((data) => {
        console.log('Project posted successfully', data);
        this.toaster.showSuccess('User Created successfully');
        this.visible = false;
        this.profileForm.reset();
      })
      .catch((error) => console.error('Error posting project: ', error));
  }

  deleteProjectData() {
    const value = this.profileForm.value['username'];
    const projectId = value;

    this.userService.deleteProjectData(projectId)
      .then((data) => {
        console.log('Project posted successfully', data);
        this.visible = false;
        this.update = false;
        this.profileForm.reset();
      })
      .catch((error) => console.error('Error posting project: ', error));
  }

  patchForm(data: any) {
    this.update = true;
    this.visible = true;
    console.log("this is value", data);
    this.profileForm.patchValue(data);
    // this
  }

  updateProjectData() {
    console.log("updted")
    console.log(this.profileForm.value['username']);
    const value = this.profileForm.value['username'];
    if (this.profileForm.invalid) {
      this.toaster.showError('Please fill out all asterisk fields');
      return;
    }

    const mail = this.profileForm.value['email'];
    console.log("this is mail", mail);
    const emailAlready: any = this.allData.filter((data: any) => data.email === mail);
    console.log("this is mail", emailAlready);

    if (emailAlready.length === 2) {
      this.toaster.showError('This Email Already exist');
      return;

    }
    const roleMail = this.profileForm.value['username'];
    console.log("this is mail", mail);
    const roleMailAlready: any = this.allData.filter((data: any) => data.role === roleMail);
    if (roleMailAlready.length === 2) {
      this.toaster.showError('This User Already');
      return;

    }
    const projectId = value;
    const projectData = {
      name: this.profileForm.value['name'],
      gender: this.profileForm.value['gender'],
      email: this.profileForm.value['email'],
      role: this.profileForm.value['role'],
      phoneNo: this.profileForm.value['phoneNo'],
      password: this.profileForm.value['password'],
      department: this.profileForm.value['department'],
      designation: this.profileForm.value['designation'],
      username: this.profileForm.value['username'],
    };

    this.userService.updateProjectData(projectId, projectData)
      .then((data) => {

        this.toaster.showSuccess('User Updated successfully');

        this.visible = false;
        this.update = false;
        this.profileForm.reset();
      })
      .catch((error) => console.error('Error posting project: ', error));
  }

  dialogCancel() {
    this.profileForm.reset();
    this.visible = false;
    this.update = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  search() {
    console.log("this is value:", this.username);
    const value = this.allData.filter((data: any) => data.name === this.username);
    this.filterData = value;
  }
}
