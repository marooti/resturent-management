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

  logs: any[]=[
    {name:'haris', day:'10 sep', time:'2h30m'},
    {name:'haris', day:'11 sep', time:'2h30m'}

  ];

  constructor(private firestoreService: FirestoreService, private firestore: Firestore, private toaster: ToastrService){}

  ngOnInit(): void {
    console.log("all time log")
      this.gettimelogs();
  }
gettimelogs(){
   this.firestoreService.getallTimelog().then((data)=>{
    console.log("all time logs", data)
   })
}

}
