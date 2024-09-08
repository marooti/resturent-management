import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,AboutRoutingModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
