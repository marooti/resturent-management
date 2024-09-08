import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllChatRoutingModule } from './all-chat-routing.module';

@Component({
  selector: 'app-all-chat',
  standalone: true,
  imports: [CommonModule,AllChatRoutingModule],
  templateUrl: './all-chat.component.html',
  styleUrl: './all-chat.component.scss'
})
export class AllChatComponent {

}
