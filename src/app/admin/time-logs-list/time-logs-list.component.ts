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

interface TimelogEntry {
  date: string;
  description: string;
  issueName: string;
  spentTame: string;
  startTime: string;
}
interface Timelog {
  data: TimelogEntry[];
}
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
  private _name!: string;
  @Input()
  set name(value: string) {
    this._name = value;
    this.changeIf();  // Call changeIf() when the value of name changes
  }

  get name(): string {
    return this._name;
  }

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
    console.log("on change:", this.name);
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
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
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    this.firestoreService.getallData().then((data) => {
      this.getAllData = data;

      this.allData = data.map((entry: any) => {
        const filteredDateData = entry[currentDate] ? { [currentDate]: entry[currentDate] } : null;

        return filteredDateData ? { id: entry.id, ...filteredDateData } : null;
      }).filter(Boolean);
    });
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
    const day = this.entry.date;
    const name = this.namehg?.id;
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
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = this.dateOf.toLocaleDateString('en-US', options);
    const day = formattedDate;
    const name = this.namehg?.id;
    const data = {
      date: formattedDate,
      issueName: this.issueNameVlaue,
      spentTame: this.timeSpent,
      startTime: time,
      description: this.description
    };
    this.firestoreService.updateTimelog(name, day, data, this.index)
      .then(() => {
        this.toaster.showSuccess('Updated successfully');
        this.getAlldata();

        this.visible = false;
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

  getUserName(username: any) {
    let name = this.employeeDropdown?.filter((entry: any) => entry?.username === username);
    return name[0]?.name;

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
    this.searchValue = true;
    this.value = this.employeeDropdown.filter((name: any) => name.id === this.employeeName.username);
    let valueAll = this.getAllData.filter((name: any) => name.id === this.employeeName.username);
    let payload = {
      data: Object.entries(valueAll[0])
        .filter(([key, value]: [string, Timelog | any]) => key !== 'id' && (value as Timelog)?.data && Array.isArray((value as Timelog).data))
        .map(([date, value], index) => ({
          index,
          date,
          name: this.value[0]?.name,
          data: (value as Timelog).data.map((entry: TimelogEntry) => ({ ...entry }))
        }))
    };

    this.allData = [payload];
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
  }


  calculateTotalTime(data: any): string {
    let grandTotalHours = 0;
    let grandTotalMinutes = 0;

    data?.data.forEach((spentTime: any) => {
      const timeString = spentTime?.spentTame.toLowerCase();
      const hourMatch = timeString.match(/(\d+)h/)?.[1] || '0';
      const minuteMatch = timeString.match(/(\d+)m/)?.[1] || '0';

      grandTotalHours += parseInt(hourMatch);
      grandTotalMinutes += parseInt(minuteMatch);
    });

    // Convert minutes to hours
    grandTotalHours += Math.floor(grandTotalMinutes / 60);
    grandTotalMinutes %= 60;

    return `${grandTotalHours}h ${grandTotalMinutes}m`;
  }

}
