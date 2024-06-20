import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, DocumentReference, DocumentData, doc, setDoc, CollectionReference, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Animal } from '../../interfaces/animal';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptPetService {
  usersCollection!: CollectionReference<DocumentData>;

  constructor(private fireStore: Firestore,private apiService:ApiService) {
    this.usersCollection = collection(this.fireStore, 'adoptPet');
  }

  async adoptPet(animal: Animal): Promise<void> {
  const animalRef = doc(this.usersCollection, animal.id.toString());
  const animalSnapshot = await getDoc(animalRef);

  if (animalSnapshot.exists()) {
    await deleteDoc(animalRef);
    window.alert("Deleted from Favorites")
  } else {
    await setDoc(animalRef, animal);
    window.alert("Added to Favorites")
  }
  }

  getAdoptedPets(): Observable<DocumentData[]> {
    return collectionData<DocumentData>(this.usersCollection);
  }
}
