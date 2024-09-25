import { Component, OnInit } from '@angular/core';
import { TimeLogsListComponent } from "../time-logs-list/time-logs-list.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [TimeLogsListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  profileData: any;
  locathostData: any;
  pdfdownload: any;

  ngOnInit() {
    this.locathostData = localStorage.getItem('userProfile');
    this.profileData = JSON.parse(this.locathostData);
  }
  changeValue() {
    this.pdfdownload = "imran"
  }
}
