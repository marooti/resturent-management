import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeRoutingModule } from '../home-routing.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HomeRoutingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
