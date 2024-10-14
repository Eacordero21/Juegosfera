import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';  // Required imports
import { Observable } from 'rxjs';  // Optional: for returning observables if needed

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}  // Inject Firestore

  // Method to add form data to a Firestore collection
  addData(data: { name: string; email: string; message: string }): Promise<void> {
    const dataCollection = collection(this.firestore, 'formData');  // Reference to Firestore collection 'formData'

    return addDoc(dataCollection, data)  // Add document to Firestore collection
      .then(() => {
        console.log('Data successfully added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding data to Firestore:', error);
        throw error;  // Throw error to handle it in the component
      });
  }
}
