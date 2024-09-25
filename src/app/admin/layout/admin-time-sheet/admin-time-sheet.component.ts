import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FirestoreService } from '@services/firestore.service';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from '@services/toastr.service';
import { ProjectSidebarComponent } from '../../../pages/components/project-sidebar/project-sidebar.component';
import jsPDF from 'jspdf';

interface Attendance {
  [key: string]: {
    data: {
      checkInTime: string;
      checkOutTime: string;
      date: string;
      name: string;
      location?: string;
    }[];
  } | string;
}

@Component({
  selector: 'app-admin-time-sheet',
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
  templateUrl: './admin-time-sheet.component.html',
  styleUrl: './admin-time-sheet.component.scss'
})
export class AdminTimeSheetComponent {
  checking: any[] = [
    { date: 12 - 12 - 24, time: 12 - 50 }
  ];
  loading: boolean = false;
  locathostData: any;
  checkingstatus: boolean = false;
  days: any[] = []
  profileData: any;
  todayDate: any;
  employeeDropdown: any;
  employeeName: any;
  allAttendance: any;

  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService) {

  }
  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.checking;
    const currentDate = new Date();
    const time = currentDate.toTimeString().split(' ')[0];
    this.todayDate = currentDate.toDateString();
    this.fetchTimelogData(this.profileData.username);
    this.getAllUserProfiles();
  }

  getAllUserProfiles() {
    this.firestoreService.getAllUser().subscribe(
      (data) => {
        this.employeeDropdown = data;
      });
  }

  getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition): void => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          fetch(url).then(response => response.json()).then(data => {
            if (data && data.address) {
              const locationName = `${data.address.city || ''}, ${data.address.country || ''}`;
              console.log("Location Name:", data.display_name);
            } else {
              console.error("Unable to find location.");
            }
          })
        },
        (error: GeolocationPositionError): void => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  checkin() {
    this.loading = true;
    const currentDate = new Date();
    const time = currentDate.toTimeString().split(' ')[0];
    const date = currentDate.toDateString();

    this.checkingstatus = true;
    const data = {
      checkInTime: time,
      name: this.profileData.name,
      checkOutTime: '',
      date: date,
    }
    this.firestoreService.checkin(this.profileData.username, date, data)
      .then(() => {
        this.toaster.showSuccess('Successfully Check-In');
        this.loading = false;
        this.fetchTimelogData(this.profileData.username);
      })
      .catch(error => {
        this.loading = false;
        console.error('Error adding data: ', error);
      });
  }

  checkout() {
    this.loading = true;
    const currentDate = new Date();
    const time = currentDate.toTimeString().split(' ')[0];
    const date = currentDate.toDateString();
    const choutTime = this.days.find(product => product.date == date);
    if (choutTime?.checkOutTime) {
      this.toaster.showError('you are already checkout');
      this.loading = false;
      return;
    }
    const data = {
      checkInTime: choutTime?.checkInTime,
      name: this.profileData.name,
      checkOutTime: time,
      date: date,
    }

    this.firestoreService.checkOut(this.profileData.username, date, data)
      .then(() => {
        this.toaster.showSuccess('Successfully Checkout');
        this.loading = false;
        this.fetchTimelogData(this.profileData.username);
      })
      .catch(error => {
        this.loading = false;

        console.error('Error adding data: ', error);
      });
  }

  fetchTimelogData(name: string) {
    this.loading = true;

    this.firestoreService.getAttendance().subscribe(
      (data: any[]) => {

        const allAttendance = data.map((item: any) => {
          return Object.keys(item).map((key: string) => {
            if (key !== 'id') {
              return item[key].data.map((record: any) => ({
                checkInTime: record.checkInTime,
                checkOutTime: record.checkOutTime,
                date: record.date,
                name: record.name,
                location: record.location || '',
                id: item.id
              }));
            }
            return null;
          }).filter(entry => entry !== null).flat();
        }).flat();
        this.loading = false;
        const currentDate = new Date().toDateString();
        this.allAttendance = allAttendance;
        this.days = allAttendance.filter((data: any) => data.date === currentDate);
        console.log("Formatted All Attendance:", this.days, "today", currentDate);
      }
    );
  }





  transformTimelogData(data: any): any[] {
    const result: any[] = [];

    Object.keys(data).forEach((date) => {
      const dayData = data[date].data;


      dayData.forEach((entry: any) => {
        result.push({
          name: entry.name,
          date: entry.date,
          checkInTime: entry.checkInTime,
          checkOutTime: entry.checkOutTime,
          location: entry.location,
        });
      });
    });

    console.log("Check in detail:", result);
    return result;
  }

  // Method to be called on input change
  changeIf() {
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

  searchRecord() {
    const filerData = this.allAttendance.filter((data: any) => data?.name === this.employeeName?.name)
    console.log("this is name:", filerData);
    this.days = filerData;
  }

}
