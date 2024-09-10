import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '@services/firestore.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
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
  @ViewChild('htmlData') el!: ElementRef;

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
  processedData: any[] = [];
  grandTotalTime: any;
  apiData: any;


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

  searchRecord() {
    console.log("this is date for you:", this.rangeDates);

    // Define options for formatting dates
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };

    // Format start and end dates
    const startDate = this.rangeDates[0].toLocaleDateString('en-US', options);
    const endDate = this.rangeDates[1].toLocaleDateString('en-US', options);

    console.log("Start Date:", startDate, "End Date", endDate);
    console.log("this is api data :", this.apiData);

    // Convert formatted dates back to Date objects
    const start = new Date(this.rangeDates[0]);
    const end = new Date(this.rangeDates[1]);

    // Define the type for the filtered data
    type ApiData = { [key: string]: { data: any[] } };

    // Ensure apiData has the correct type
    const apiData = this.apiData as ApiData;

    // Filter API data
    const filteredData = Object.keys(apiData)
      .map(key => ({
        date: new Date(key),
        data: apiData[key].data
      }))
      .filter(item => item.date >= start && item.date <= end)
      .reduce((acc: ApiData, item) => {
        acc[item.date.toDateString()] = { data: item.data };
        return acc;
      }, {} as ApiData);

    console.log("Filtered Data:", filteredData);
    this.processTimelogData(filteredData);
    this.processTimelo(filteredData);
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
        this.apiData = data;
        this.processTimelogData(data);
        this.processTimelo(data);
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

  processTimelo(data: any) {
    this.processedData = []; // Initialize the processed data array

    let grandTotalHours = 0; // Initialize variables for total hours and minutes
    let grandTotalMinutes = 0;

    // Iterate through each key in the data (e.g., "Mon, Sep 09, 2024")
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        const entry = data[date];

        // Calculate the total spent time for the day
        let totalHours = 0;
        let totalMinutes = 0;

        entry.data.forEach((log: any) => {
          const timeString = log.spentTame.toLowerCase();

          // Match for hours and minutes
          const hourMatch = timeString.match(/(\d+)h/);
          const minuteMatch = timeString.match(/(\d+)m/);

          if (hourMatch) {
            totalHours += parseFloat(hourMatch[1]);
          }
          if (minuteMatch) {
            totalMinutes += parseFloat(minuteMatch[1]);
          }
        });

        // Convert total minutes to hours if over 60
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;

        // Update grand totals
        grandTotalHours += totalHours;
        grandTotalMinutes += totalMinutes;

        // Format total time as 'Xh Ym'
        const totalSpendTime = `${totalHours}h ${totalMinutes}m`;

        // Create a new object for the processed data format
        const formattedEntry = {
          date: date,
          totalSpendTime: totalSpendTime.trim(), // Trim to remove any extra spaces
          data: entry.data,
        };

        // Push the formatted entry to the processed data array
        this.processedData.push(formattedEntry);
      }
    }

    // Convert grand total minutes to hours if over 60
    grandTotalHours += Math.floor(grandTotalMinutes / 60);
    grandTotalMinutes = grandTotalMinutes % 60;

    const grandTotalTime = `${grandTotalHours}h ${grandTotalMinutes}m`;
    console.log('Processed Timelog Data:', this.processedData);
    console.log('Total time spent for all entries:', grandTotalTime);
    this.grandTotalTime = grandTotalTime;
    // Assign the processed data to a variable or do any further processing here
  }


  addTimelog() {
    console.log("this is value for ", this.startTime, this.description, this.dateOf, this.employeeName, this.issueNameVlaue, this.timeSpent,)

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
    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined || value.toString().trim() === '') {
        console.log(`Warning: ${key} is ${value}`);
        return;
      }
    }
    console.log("this is finally responce:", data);
    return;
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


  onSelectionChange() {
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
}
