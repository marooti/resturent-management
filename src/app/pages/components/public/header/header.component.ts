import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatLandComponent } from "../chat/chat-land/chat-land.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ChatLandComponent
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
