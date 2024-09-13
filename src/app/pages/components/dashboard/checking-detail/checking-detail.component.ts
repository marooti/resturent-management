import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ProjectSidebarComponent } from "../../project-sidebar/project-sidebar.component";
import { FirestoreService } from '@services/firestore.service';
import { Firestore } from 'firebase/firestore';
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

  constructor() {

  }
  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData)
    console.log("this is localhost data :", this.profileData.username);
    this.checking;
  }

getlocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition): void => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            fetch(url).then(response => response.json()).then(data=>{
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
        },
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
}
}

  checkin() {
    const currentDate = new Date();
    const time = currentDate.toTimeString();
    const date = currentDate.toDateString();
this.getlocation();
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
    
    // this.firestoreService.checkin(this.profileData.username, date, data)
    //   .then(() => {
    //     console.log('Data added successfully');

    //   })
    //   .catch(error => {
    //     console.error('Error adding data: ', error);
    //   });
  }
  checkout() {
    const currentDate = new Date();
    const time = currentDate.toTimeString()
    const date = currentDate.toDateString()
    console.log("username :", this.profileData.username);
    console.log('checkout Time, timezone', time);
    console.log('checkout Day , Date:', date);
    this.checkingstatus = false;
  }
}
