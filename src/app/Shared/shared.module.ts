import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectSidebarComponent } from '../pages/components/project-sidebar/project-sidebar.component';
import { HeaderComponent } from '../pages/components/public/header/header.component';


@NgModule({
  declarations: [

  ],
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PrimengModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    HeaderComponent,
    ProjectSidebarComponent

  ],
  exports:[
    PrimengModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    HeaderComponent,
    ProjectSidebarComponent
  ]
})
export class SharedModule { }
