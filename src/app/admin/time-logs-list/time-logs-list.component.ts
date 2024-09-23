import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '@services/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

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
  ],
  templateUrl: './time-logs-list.component.html',
  styleUrl: './time-logs-list.component.scss'
})
export class TimeLogsListComponent implements OnInit {
  allData: any;
  logs: any[] = [
    { name: 'haris', day: '10 sep', time: '2h30m' },
    { name: 'haris', day: '11 sep', time: '2h30m' }

  ];

  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAlldata();
    console.log("all time log")
    this.gettimelogs();
  }
  gettimelogs() {
    this.firestoreService.getallTimelog().then((data) => {
      console.log("all time logs", data)
    })
  }

  getAlldata() {
    console.log("Fetching data...");

    // Get the current date in the format "Mon, Sep 23, 2024"
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    console.log("Current Date: ", currentDate); // Debug to ensure correct format

    this.firestoreService.getallData().then((data) => {
      // Filter the data to only include records that have today's data entries
      this.allData = data.map((entry: any) => {
        // Get all date keys except 'id'
        const dateKeys = Object.keys(entry).filter(key => key !== 'id');

        // Check if the current date exists in the dateKeys and extract only that data
        const filteredDateData = dateKeys
          .filter(dateKey => dateKey === currentDate) // Filter for today
          .reduce((result: any, dateKey: string) => {
            // Add today's data to the result object
            result[dateKey] = entry[dateKey];
            return result;
          }, {});

        // Only return entries if there's data for today
        if (Object.keys(filteredDateData).length > 0) {
          return {
            id: entry.id,
            ...filteredDateData
          };
        }

        return null; // Skip entries without today's data
      }).filter(Boolean); // Filter out null entries

      console.log("Filtered data for current date:", this.allData);
    });
  }




  getDateKeys(log: any): string[] {
    return Object.keys(log).filter(key => key !== 'id'); // Return all date keys except 'id'
  }

  processTimelo(data: any) {
    // this.processedData = [];

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


}
