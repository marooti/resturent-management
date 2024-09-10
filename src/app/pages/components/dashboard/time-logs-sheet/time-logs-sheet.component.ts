import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@services/firestore.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { CheckingDetailComponent } from "../checking-detail/checking-detail.component";
interface TimelogEntry {
  date: any; // Use appropriate type if you know it (e.g., Date or Timestamp)
  issueName: string;
  description: string;
  spentTame: string; // Assuming 'spentTame' is a typo and should be 'spentTime'
  startTime: any; // Use appropriate type if you know it
}

interface TimelogData {
  data: TimelogEntry[];
}

interface WeeklyData {
  [key: string]: TimelogData;
}


@Component({
  selector: 'app-time-logs-sheet',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    CheckingDetailComponent
],
  templateUrl: './time-logs-sheet.component.html',
  styleUrls: ['./time-logs-sheet.component.scss']
})
export class TimeLogsSheetComponent implements OnInit {
  todayDate: any;
  dayName: any;
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weeklyData: { [key: string]: any[] } = {};
  days: string[] = [];
  rangeDates: any;

  employeeDropdown: any[] = [
    { name: 'Muhammad Imran' },
    { name: 'Awais Arshad' },
    { name: 'Hassan Subhani' },
  ];

  issueName: any;

  visible: boolean = false;
  employeeName: any;
  issueNameVlaue: any;
  timeSpent: any;
  startTime: any;
  description: any;
  dateOf: any;
  locathostData: any;
  profileData: any
  projects$: Observable<any[]>;

  constructor(private firestoreService: FirestoreService, private firestore: Firestore) {
    const today = new Date();
    this.dateOf = today;
    this.todayDate = today.toDateString();
    this.dayName = this.daysOfWeek[today.getDay()];

    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData)
    console.log("this is localhost data :", this.profileData.username);
    this.fetchTimelogData(this.profileData.username);
    this.getproducts();
  }

  getproducts() {
    this.projects$.subscribe(data => {
      this.issueName = data;
      console.log('Projects:', data);
    });
  }

  getAllUserProfiles() {
    this.firestoreService.getAllUserProfiles().subscribe(
      (data) => {
        console.log('Timelog data:', data); // Log data for verification
        this.processTimelogData(data);
      });
  }

  showdialog() {
    this.visible = true;
  }

  fetchTimelogData(name: string) {
    this.firestoreService.getTimelog(name)
      .then((data) => {
        console.log('Timelog data:', data); // Log data for verification
        this.processTimelogData(data);
      })
      .catch((error) => {
        console.error('Error fetching timelog data:', error);
      });
  }

  processTimelogData(data: any) {
    this.weeklyData = {};

    // Convert object entries to an array and sort by date
    const sortedEntries = Object.entries(data).sort(([dayA, valueA], [dayB, valueB]) => {
      const dateA = new Date(dayA);
      const dateB = new Date(dayB);
      return dateA.getTime() - dateB.getTime(); // Sort in ascending order
    });

    // Iterate over sorted entries to process the data
    for (const [day, value] of sortedEntries) {
      this.weeklyData[day] = (value as TimelogData).data || [];
    }

    this.days = Object.keys(this.weeklyData);
    console.log('Processed weeklyData:', this.weeklyData);
    console.log('Days:', this.days);
  }





  addTimelog() {
    console.log("this is value for ", this.startTime, this.description, this.dateOf, this.employeeName, this.issueNameVlaue, this.timeSpent,)
    // let dayname = new Date('Fri Sep 06 2024 00:00:00 GMT+0500');
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = this.dateOf.toLocaleDateString('en-US', options);
    console.log("This is date format:", formattedDate);
    console.log("this is date formet:", this.dateOf);
    const day = formattedDate;
    const name = this.profileData.username;
    const data = {
      date: this.dateOf,
      issueName: this.issueNameVlaue,
      spentTame: this.timeSpent,
      startTime: this.startTime,
      description: this.description
    };
    console.log("this is finally responce:", data);
    this.firestoreService.addTimelog(name, day, data)
      .then(() => {
        console.log('Data added successfully');
        this.visible = false;
        this.fetchTimelogData(this.profileData.username);
      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });
  }


}
