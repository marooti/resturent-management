import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ProjectSidebarComponent } from "../../project-sidebar/project-sidebar.component";
import { FirestoreService } from '@services/firestore.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { ToastrService } from '@services/toastr.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
declare var google: any;
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
    ProjectSidebarComponent,
    ProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './checking-detail.component.html',
  styleUrl: './checking-detail.component.scss'
})
export class CheckingDetailComponent implements OnInit {
  visible = false;
  submitted = false;
  profileForm!: FormGroup
  apiKey = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrY9pu8WvYAe78IxlHB4nG7QbHZzM8bMU&libraries=places&language=en'
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
  locationName: any;
  apiLoaded: any;
  currentAddress: any;
  dateTime = new Date();
  issueName: any[] = [
    {
      name: 'Check In'
    },
    {
      name: 'Check Out'
    },
    {
      name: 'Both'
    }
  ]
requestselected: any;

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService,
    private firestore: Firestore,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {

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
    this.getCurrentLocationAndAddressd();

    // this.getLocation();
    this.createForm();
  }

  onchange(type: any){
    console.log('request type', type)
    this.requestselected = type;
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: [undefined, [Validators.required]],
      date: [undefined, [Validators.required]],
      check_in: [undefined],
      check_out: [undefined],
      description: [undefined]
    });
  }

  getCurrentLocationAndAddressd(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Call the method to get the address from latitude and longitude
          this.getLocation(latitude, longitude)
            .then(locationName => {
              this.locationName = this.locationName;
              console.log("Current Location Address:", locationName);
              // You can set this address to a variable if needed
              this.currentAddress = locationName;
            })
            .catch(error => {
              console.error("Error getting address:", error);
            });
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          maximumAge: 0,  // Optional: Force the device to not use cached positions
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }


  getLocation(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ location: latlng }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const locationName = results[0].formatted_address;
            resolve(locationName);
            this.currentAddress = locationName;
            console.log('Location Name:', locationName);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoding failed: ' + status);
        }
      });
    });
  }



  getAddressFromLatLng(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ 'location': latlng }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const formattedAddress = results[0].formatted_address;
            resolve(formattedAddress);
            console.log("Formatted Address:", formattedAddress);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
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
      location: this.currentAddress,
      date: date,
    }

    console.log("HYT:", this.currentAddress);
    console.log("checkin time data", data);

    // return
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
    console.log("this is location name:", this.locationName, "nd", time);

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
      location: choutTime?.location,
      date: date,
    }
console.log("checkout time check:", data)

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
        const transformedDatainsort = transformedData.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
        console.log("transformeddata", transformedDatainsort)
        this.days = transformedDatainsort;
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

  onsubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      this.toaster.showError('Please fill out all asterisk fields');
      return;
    }
    // let value = this.profileForm.value['check_in'].toTimeString()?.split(' ')[0];
    let value = this.profileForm.value;
    if(value.check_in){
      const data = {
        checkInTime: value.check_in.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        name: this.profileData.name,
        checkOutTime: value.check_out,
        location: this.currentAddress,
        date: value.date,
      }
      console.log("this is value:", data);
    } else{
      const data = {
        checkInTime: value.check_in,
        name: this.profileData.name,
        checkOutTime: value.check_out.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        location: this.currentAddress,
        date: value.date,
      }
      console.log("this is value:", data);

    }

     }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  cancelFrom() {
    this.visible = false;
    this.profileForm.reset();
  }
}
