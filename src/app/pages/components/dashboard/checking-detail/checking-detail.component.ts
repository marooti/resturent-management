import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ProjectSidebarComponent } from "../../project-sidebar/project-sidebar.component";
import { FirestoreService } from '@services/firestore.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checking-detail',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    ProjectSidebarComponent
  ],
  templateUrl: './checking-detail.component.html',
  styleUrl: './checking-detail.component.scss'
})
export class CheckingDetailComponent implements OnInit {

  checking: any[] = [
    { date: 12 - 12 - 24, time: 12 - 50 }
  ];
  locathostData: any;

  checkingstatus: boolean = false;

  profileData: any;

  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService) {

  }
  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData)
    console.log("this is localhost data :", this.profileData.username);
    this.checking;
  }



  checkin() {
    const currentDate = new Date();
    const time = currentDate.toTimeString();
    const date = currentDate.toDateString();
    console.log("username :", this.profileData.username);
    console.log('checkin Time, timezone', time);
    console.log('checkin Day , Date:', date);
    this.checkingstatus = true;
    const data = {
      checkInTime: time,
      name: this.profileData.name,
      checkOutTime: '',
      date: date,
    }

    this.firestoreService.checkin(this.profileData.username, date, data)
      .then(() => {
        console.log('Data added successfully');

      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });
  }

  checkout() {
    const currentDate = new Date();
    const time = currentDate.toTimeString()
    const date = currentDate.toDateString()
    console.log("username :", this.profileData.username);
    console.log('checkout Time, timezone', time);
    console.log('checkout Day , Date:', date);
    this.checkingstatus = false;
    const data = {
      checkInTime: time,
      name: this.profileData.name,
      checkOutTime: time,
      date: date,
    }

    this.firestoreService.checkOut(this.profileData.username, date, data)
      .then(() => {
        console.log('Data added successfully');

      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });
  }
}
