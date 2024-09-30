import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '@services/firestore.service';
import { ToastrService } from '@services/toastr.service';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-time-logs-list',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './time-logs-list.component.html',
  styleUrl: './time-logs-list.component.scss'
})
export class TimeLogsListComponent implements OnInit {


  allData: any;
  visible: boolean = false;
  issueName: any;
  issueNameVlaue: any;
  projects$!: Observable<any[]>;
  dateOf: any;
  namehg: any;
  entry: any;
  index: any;
  description: any;
  timeSpent: any;
  startTime: any;
  employeeDropdown: any;
  rangeDates: any;

  employeeName: any;
  searchValue = false;
  getAllData: any;
  value: any;
  profileData: any;
  locathostData: any;
  grandTotalTime: any;

  constructor(
    private firestoreService: FirestoreService
    , private firestore: Firestore
    , private toaster: ToastrService
  ) {
    const today = new Date();
    this.dateOf = today;
    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  ngOnInit(): void {
    this.getAlldata();
    this.getproducts();
    this.getAllUserProfiles();
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.lastMonthDate();
  }

  lastMonthDate() {
    const today = new Date();
    const lastSunday = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastFriday = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.rangeDates = [lastSunday, lastFriday];

  }

  // Method to be called on input change
  changeIf() {
    console.log("dbfdb")
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a3',
    });
    const htmlData = document.getElementById('htmlData');
    // console.log("Pdf Image:", htmlData);
    if (htmlData) {
      pdf.html(htmlData, {
        margin: [23, 0, 50, 0],
        callback: (pdf: any) => {
          pdf.save('timelogssheet.pdf');

        }
      });
    }

  }

  getAlldata() {
    this.firestoreService.getallData().then((data) => {
      const reorganizedData: any = [];

      for (const entry of data) {
        Object.keys(entry).forEach(key => {
          if (key !== 'id') {
            reorganizedData.push({
              date: key,
              name: entry[key].data[0]?.name || [],
              data: entry[key].data || []
            });
          }
        });
      }

      const dateDate = reorganizedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      this.tableData(dateDate);

    });
  }

  tableData(data: any) {
    this.allData = data;
    this.getAllData = data;
  }

  getDateKeys(log: any): string[] {
    return Object.keys(log).filter(key => key !== 'id');
  }

  getproducts() {
    this.projects$.subscribe(data => {
      this.issueName = data;
    });
  }

  deleteIndex() {
    const filterName = this.employeeDropdown.filter((data: any) => data.name === this.namehg?.name);

    const day = this.entry.date;
    const name = filterName[0].username;
    const data = {
      date: this.entry.date,
    };
    this.firestoreService.daleteTimelog(name, day, data, this.index)
      .then(() => {
        this.toaster.showSuccess('Deleted successfully');
        this.getAlldata();
        this.visible = false;

      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });
  }
  updateUI() {
    const time = this.startTime.toTimeString().split(' ')[0];
    console.log("this is all user data:", this.employeeDropdown);
    const filterName = this.employeeDropdown.filter((data: any) => data.name === this.namehg?.name);
    const projectCode = this.issueName.filter((data: any) => data?.name === this.issueNameVlaue);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = this.dateOf.toLocaleDateString('en-US', options);
    const day = formattedDate;
    const name = filterName[0].username;
    const data = {
      date: formattedDate,
      issueName: this.issueNameVlaue,
      spentTame: this.timeSpent,
      startTime: time,
      description: this.description,
      name: this.namehg?.name,
      projectCode: projectCode[0].id
    };

    console.log("this data:", name, "value", day, "value 1", data, "index", this.index, "value:", filterName);

    this.firestoreService.updateTimelog(name, day, data, this.index)
      .then(() => {
        this.toaster.showSuccess('Updated successfully');
        this.visible = false;
        this.getAlldata();
      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });

  }

  getAllUserProfiles() {
    this.firestoreService.getAllUser().subscribe(
      (data) => {
        this.employeeDropdown = data;
      });
  }



  processTimelo(data: any) {
    let grandTotalHours = 0;
    let grandTotalMinutes = 0;
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        const entry = data[date];
        entry.data?.forEach((log: any) => {
          const timeString = log.spentTame.toLowerCase();
          const hourMatch = timeString.match(/(\d+)h/)?.[1] || 0;
          const minuteMatch = timeString.match(/(\d+)m/)?.[1] || 0;
          grandTotalHours += parseInt(hourMatch);
          grandTotalMinutes += parseInt(minuteMatch);
        });
      }
    }
    grandTotalHours += Math.floor(grandTotalMinutes / 60);
    grandTotalMinutes %= 60;
    return `${grandTotalHours}h ${grandTotalMinutes}m`;
  }

  search() {
    const startDate = new Date(this.rangeDates[0]);
    const endDate = new Date(this.rangeDates[1]);
    const filteredData = this.getAllData.filter((data: any) => {
      const recordDate = new Date(data?.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
    if (this.employeeName?.name) {
      this.allData = filteredData.filter((data: any) => data?.name === this.employeeName?.name);
    } else {
      this.allData = filteredData;
    }
  }

  showingDialog(namehg: any, entry: any, index: any) {
    this.description = entry?.description;
    this.issueNameVlaue = entry?.issueName;
    this.timeSpent = entry?.spentTame;
    const timeString = entry?.startTime;
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    this.startTime = date;
    this.dateOf = new Date(entry?.date);
    this.namehg = namehg;
    this.entry = entry;
    this.index = index;
    this.visible = true;
    console.log("this is table value:", namehg, entry, this.index);
  }

  // Helper function to convert time like '7h', '30m' into minutes
  convertToMinutes(time: string): number {
    const hourMatch = time.match(/(\d+)h/);
    const minuteMatch = time.match(/(\d+)m/);

    let hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    let minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

    return hours * 60 + minutes;
  }

  // Function to calculate the total spent time
  calculateTotalTime(logs: any[]): string {
    let totalMinutes = logs.reduce((acc, log) => acc + this.convertToMinutes(log.spentTame), 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }



}
