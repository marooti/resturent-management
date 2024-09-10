import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, DocumentSnapshot, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionName = 'timelog';  // Collection name
  private userCollectionName = 'users'
  userproducts = 'projects'

  constructor(private firestore: Firestore) { }

  async addTimelog(name: string, day: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, name); // Use `name` as `id`

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      let existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      let dataName = 'data'
      // Ensure day and date exist in the data structure
      if (!existingData[day]) {
        existingData[day] = {};
      }
      if (!existingData[day]['data']) {
        existingData[day]['data'] = [];
      }

      // Append new data to the existing date
      existingData[day]['data'].push(data);

      await setDoc(docRef, existingData, { merge: true });
      console.log('Document updated with ID: ', name);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async getTimelog(name: string): Promise<any> {
    const docRef = doc(this.firestore, this.collectionName, name);

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();  // Return the document data
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document: ', error);
      return null;
    }
  }

  async getuserProfile(name: string): Promise<any> {
    const docRef = doc(this.firestore, this.userCollectionName, name);

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();  // Return the document data
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document: ', error);
      return null;
    }
  }

  async getProducts(name: string): Promise<any> {
    const docRef = doc(this.firestore, this.userproducts, name);

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();  // Return the document data
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document: ', error);
      return null;
    }
  }
  getAllUserProfiles(): Observable<any[]> {
    // Reference to the Firestore collection
    const usersCollection = collection(this.firestore, 'products'); // Replace 'users' with your collection name
    console.log(usersCollection)
    // Get the collection data as an Observable
    return collectionData(usersCollection, { idField: 'id' }); // Add idField to include the document ID with the data
  }


  async checkin(name: string, day: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, "attendancePortal", name); // Use `name` as `id`

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      let existingData = docSnapshot.exists() ? docSnapshot.data() : {};
      let dataName = 'data'
      // Ensure day and date exist in the data structure
      if (!existingData[day]) {
        existingData[day] = {};
      }
      if (!existingData[day]['data']) {
        existingData[day]['data'] = [];
      }

      // Append new data to the existing date
      existingData[day]['data'].push(data);

      await setDoc(docRef, existingData, { merge: true });
      console.log('Document updated with ID: ', name);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

  }

  async checkOut(name: string, day: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, "attendancePortal", name); // Use `name` as `id`

    try {
      const docSnapshot: DocumentSnapshot = await getDoc(docRef);
      let existingData = docSnapshot.exists() ? docSnapshot.data() : {};

      // Ensure day and date exist in the data structure
      if (!existingData[day]) {
        existingData[day] = {};
      }
      if (!existingData[day]['data']) {
        existingData[day]['data'] = [];
      }

      // Check if the entry already exists (assuming each entry has a unique 'id' property)
      const existingIndex = existingData[day]['data'].findIndex((entry: any) => entry.id === data.id);

      if (existingIndex !== -1) {
        // If the entry exists, update it
        existingData[day]['data'][existingIndex] = data;
      } else {
        // If it doesn't exist, append it
        existingData[day]['data'].push(data);
      }

      await setDoc(docRef, existingData, { merge: true });
      console.log('Document updated with ID: ', name);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

}
