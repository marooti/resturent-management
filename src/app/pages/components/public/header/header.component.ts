import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatLandComponent } from "../chat/chat-land/chat-land.component";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ChatLandComponent,
    LoginComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;

  constructor() { }

  ngOnInit(): void { }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
