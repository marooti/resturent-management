import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NpsProgressbarComponent } from '../gadgets/nps-progressbar/nps-progressbar.component';
import { NpsStatisticsComponent } from '../gadgets/nps-statistics/nps-statistics.component';
import { TeamStatisticsComponent } from '../gadgets/team-statistics/team-statistics.component';
import { TimeLogsSheetComponent } from '../time-logs-sheet/time-logs-sheet.component';
import { CheckingDetailComponent } from "../checking-detail/checking-detail.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NpsProgressbarComponent,
    NpsStatisticsComponent,
    TeamStatisticsComponent,
    TimeLogsSheetComponent,
    CheckingDetailComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { }