import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Animal } from '../../interfaces/animal';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.petfinder.com';
  private oAuthUrl = '/v2/oauth2/token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  authenticate(): Observable<any> {
    const body = {
      grant_type: 'client_credentials',
      client_id: "9mobydIp033SLUZ2o1cMetAGKRkfmbVhr5AptsJLtTXm49WiWh",
      client_secret: "L2Cu6EbIEsFSuQBenIn3VDRrTxrq3MUuHgA4B6wq"
    };
    return this.http.post<any>(`${this.apiUrl + this.oAuthUrl}`, body).pipe(
      tap(response => this.setAccessToken(response.access_token))
    );
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAnimals(params: HttpParams): Observable<any> {
    if (!this.accessToken) {
      return this.authenticate().pipe(
        switchMap(() => this.getAnimals(params))
      );
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get<any>(`${this.apiUrl}/v2/animals`, { headers, params });
  }

  getTypes(): Observable<any> {
    if (!this.accessToken) {
      throw new Error("Session ended");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get<any>(`${this.apiUrl}/v2/types`, { headers });
  }

  getBreeds(breedUrl: string): Observable<any> {
    if (!this.accessToken) {
      throw new Error("Session ended");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get<any>(`${this.apiUrl}${breedUrl}`, { headers });
  }

  addUserPet(animal: Animal): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userId = user.uid;
        return this.firestore.collection('users').doc(userId).collection('selectedPets').doc(animal.id.toString()).set(animal);
      } else {
        throw new Error('User not authenticated');
      }
    });
  }

  removeUserPet(animalId: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userId = user.uid;
        return this.firestore.collection('users').doc(userId).collection('selectedPets').doc(animalId).delete();
      } else {
        throw new Error('User not authenticated');
      }
    });
  }

  getUserPets(): Observable<Animal[]> {
    return new Observable<Animal[]>(observer => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          const userId = user.uid;
          this.firestore.collection('users').doc(userId).collection('selectedPets').valueChanges().subscribe((pets: any) => {
            observer.next(pets as Animal[]);
          });
        } else {
          observer.next([]);
        }
      });
    });
  }

}
