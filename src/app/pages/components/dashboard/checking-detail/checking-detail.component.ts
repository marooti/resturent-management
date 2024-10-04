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
import { ToastrService } from '@services/toastr.service';

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
  loading: boolean = false;
  locathostData: any;
  checkingstatus: boolean = false;
  days: any[] = [];
  rangeDates: any;
  profileData: any;
  todayDate: any;
  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService) {

  }
  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
    this.checking;
    const currentDate = new Date();
    const time = currentDate.toTimeString().split(' ')[0];
    const lastSunday = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastFriday = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    this.rangeDates = [lastSunday, lastFriday];
    this.todayDate = currentDate.toDateString();
    this.fetchTimelogData(this.profileData.username);
    this.getlocation();
  }

  getlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition): void => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}, accuracy: ${accuracy}`);
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          fetch(url).then(response => response.json()).then(data => {
            if (data && data.address) {
              const locationName = `${data.address.city || ''}, ${data.address.country || ''}`;
              console.log("Location Name:", locationName);
            } else {
              console.error("Unable to find location.");
            }
          }),
          {
            enableHighAccuracy: true, // Request high accuracy
            timeout: 1000, // Optional: Set a timeout to prevent long wait times
            maximumAge: 0,  // Optional: Force the device to not use cached positions
          }
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
    // const time = currentDate.toTimeString().split(' ')[0];
    const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
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
    // const time = currentDate.toTimeString().split(' ')[0];
    const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

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

    this.firestoreService.getAttendanceRecord(name)
      .then((data) => {
        const transformedData = this.transformTimelogData(data);
        this.days = transformedData;
        const choutTime = this.days.find(product => product.date == this.todayDate);
        if (choutTime) {
          this.checkingstatus = true;
        }
        else {
          this.checkingstatus = false;
        }
        this.loading = false;


      })
      .catch((error) => {
        this.loading = false;

        console.error('Error fetching timelog data:', error);
      });
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

}
