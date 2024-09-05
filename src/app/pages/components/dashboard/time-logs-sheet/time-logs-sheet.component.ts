import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-time-logs-sheet',
  standalone: true,
  imports: [
    TableModule,
    DropdownModule
  ],
  templateUrl: './time-logs-sheet.component.html',
  styleUrls: ['./time-logs-sheet.component.scss']
})
export class TimeLogsSheetComponent {
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  employeeDropdown: any = [
    { name: 'Muhammad Imran' },
    { name: 'Awais Arshad' },
    { name: 'Hassan Subhani' },
  ];
  weeklyData = [
    {
      name: 'Muhammad Imran',
      Mon: [
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
      ],
      Tue: [
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
      ],
      Wed: [
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
      ],
      Thu: [
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        },
      ],
      Fri: [
        {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }, {
          name: 'New issue',
          time: '4h 25m',
          daily: 'Workig Issue Name',
          description: "I am working in schedule"
        }
      ]
    },



  ];
}
