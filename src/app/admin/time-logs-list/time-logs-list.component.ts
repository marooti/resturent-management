import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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


  // Time logs 
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
  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService) {
    const today = new Date();
    this.dateOf = today;
    const projectsCollection = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsCollection);
  }

  ngOnInit(): void {
    this.getAlldata();
    console.log("all time log")
    this.gettimelogs();
    this.getproducts();
  }
  gettimelogs() {
    this.firestoreService.getallTimelog().then((data) => {
      console.log("all time logs", data)
    })
  }

  getAlldata() {
    console.log("Fetching data...");

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    console.log("Current Date: ", currentDate);

    this.firestoreService.getallData().then((data) => {

      this.allData = data.map((entry: any) => {

        const dateKeys = Object.keys(entry).filter(key => key !== 'id');


        const filteredDateData = dateKeys
          .filter(dateKey => dateKey === currentDate)
          .reduce((result: any, dateKey: string) => {
            result[dateKey] = entry[dateKey];
            return result;
          }, {});


        if (Object.keys(filteredDateData).length > 0) {
          return {
            id: entry.id,
            ...filteredDateData
          };
        }

        return null;
      }).filter(Boolean);

      console.log("Filtered data for current date:", this.allData);
    });
  }




  getDateKeys(log: any): string[] {
    return Object.keys(log).filter(key => key !== 'id');
  }

  processTimelo(data: any) {

    let grandTotalHours = 0;
    let grandTotalMinutes = 0;

    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        const entry = data[date];

        let totalHours = 0;
        let totalMinutes = 0;

        entry.data?.forEach((log: any) => {
          const timeString = log.spentTame.toLowerCase();
          const hourMatch = timeString.match(/(\d+)h/);
          const minuteMatch = timeString.match(/(\d+)m/);

          if (hourMatch) {
            totalHours += parseFloat(hourMatch[1]);
          }
          if (minuteMatch) {
            totalMinutes += parseFloat(minuteMatch[1]);
          }
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
        grandTotalHours += totalHours;
        grandTotalMinutes += totalMinutes;
        const totalSpendTime = `${totalHours}h ${totalMinutes}m`;


        const formattedEntry = {
          date: date,
          totalSpendTime: totalSpendTime.trim(),
          data: entry.data,
        };


      }
    }

    grandTotalHours += Math.floor(grandTotalMinutes / 60);
    grandTotalMinutes = grandTotalMinutes % 60;

    const grandTotalTime = `${grandTotalHours}h ${grandTotalMinutes}m`;
    console.log("hhs:", grandTotalTime);
    return grandTotalTime;
  }


  // Time
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
    console.log("ti:", this.description, "this.", this.issueNameVlaue, "hf:", this.startTime);
    this.namehg = namehg;
    this.entry = entry;
    this.index = index;
    this.visible = true;

  }

  getproducts() {
    console.log("vfdvf", this.projects$);
    this.projects$.subscribe(data => {
      this.issueName = data;
      console.log("thus iaj:", this.issueName)
    });
  }

  // DeleteIndexValue
  deleteIndex() {
    console.log("this is data:", this.entry);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = this.dateOf.toLocaleDateString('en-US', options);
    const day = this.entry.date;
    const name = this.namehg?.id;
    const data = {
      date: this.entry.date,
      issueName: this.entry.issueName,
      spentTame: this.entry.spentTame,
      startTime: this.entry.startTime,
      description: "muhammad imran"
    };

    console.log("this is value:", data, day, name, this.index);
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
    // this.loading = true;
    const time = this.startTime.toTimeString().split(' ')[0];
    console.log("spent Time", time);
    // UpdateIndexValue
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
    console.log("this is value:", data, day, name, this.dateOf);
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

}
