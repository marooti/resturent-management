import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, DocumentSnapshot, collection, collectionData, QuerySnapshot, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private collectionName = 'projects';  // Collection name

  constructor(private firestore: Firestore) { }

  // Function to post data to Firestore
  async addProjectData(id: string, data: any): Promise<void> {
    const projectDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    try {
      await setDoc(projectDocRef, { id, ...data });
      console.log(`Document with ID ${id} successfully written!`);
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }
}
