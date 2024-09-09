import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workasio';
  data!: any;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const dataCollection = collection(this.firestore, 'your-collection');
    const dataSnapshot = await getDocs(dataCollection);
    this.data = dataSnapshot.docs.map(doc => doc.data());
  }
}
