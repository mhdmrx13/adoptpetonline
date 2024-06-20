import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import { Animal, AnimalResponse, Breed, Types } from '../../interfaces/animal';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../services/authServices/auth.service';
import { AdoptPetService } from '../../services/adopt-pet/adopt-pet.service';
import { DocumentData } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];
  responseAnimals: AnimalResponse | null = null;
  types: Types[] = [];
  breeds: Breed[] = [];
  genders: string[] = [];
  type_selected = new FormControl<string>('');
  breed_selected = new FormControl<string>('');
  gender_selected = new FormControl<string>('');
  adoptedPets: DocumentData[] = [];
  selectedAnimalIds: Set<number> = new Set<number>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private adoptPetService: AdoptPetService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.loadSelectedAnimals();
  }

  loadInitialData(): void {
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.apiService.authenticate().subscribe(
          response => {
            this.apiService.setAccessToken(response.access_token);
            this.getAnimals(new HttpParams());
            this.apiService.getTypes().subscribe(
              response => {
                this.types = response.types;
                this.genders = response.types[0].genders;
              },
              error => {
                console.error('Failed to fetch types:', error);
              }
            );
          },
          error => {
            console.error('Authentication failed:', error);
          }
        );
      } else {
        window.alert("Please login or register to access this page.");
      }
    });
  }

  getAnimals(params: HttpParams): void {
    this.apiService.getAnimals(params).subscribe(
      animals => {
        this.responseAnimals = animals;
        this.animals = animals.animals;
      },
      error => {
        console.error('Failed to fetch animals:', error);
      }
    );
  }

  loadSelectedAnimals(): void {
    this.apiService.getUserPets().subscribe(
      pets => {
        this.selectedAnimalIds = new Set(pets.map(pet => pet.id));
      },
      error => {
        console.error('Failed to load selected animals:', error);
      }
    );
  }

  isAdopted(animal: Animal): boolean {
    return this.selectedAnimalIds.has(animal.id);
  }

  adoptPet(animal: Animal): void {
    if (this.isAdopted(animal)) {
      this.apiService.removeUserPet(animal.id.toString()).then(() => {
        this.selectedAnimalIds.delete(animal.id);
        this.snackBar.open('Pet removed from your adopted list', 'Close', { duration: 3000 });
      }).catch(error => {
        console.error('Failed to remove pet:', error);
        this.snackBar.open('Failed to remove pet', 'Close', { duration: 3000 });
      });
    } else {
      this.apiService.addUserPet(animal).then(() => {
        this.selectedAnimalIds.add(animal.id);
        this.snackBar.open('Pet added to your adopted list', 'Close', { duration: 3000 });
      }).catch(error => {
        console.error('Failed to add pet:', error);
        this.snackBar.open('Failed to add pet', 'Close', { duration: 3000 });
      });
    }
  }

  getBreeds(breedUrl: string): void {
    this.apiService.getBreeds(breedUrl).subscribe(
      response => {
        this.breeds = response.breeds;
      },
      error => {
        console.error('Failed to fetch breeds:', error);
      }
    );
  }

  filter(): void {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;

    this.apiService.getAnimals(
      new HttpParams()
        .set('type', type || '')
        .set('breed', breed || '')
        .set('gender', gender || '')
        .set('page', '1')
    ).subscribe(
      animals => {
        this.responseAnimals = animals;
        this.animals = animals.animals;
      },
      error => {
        console.error('Failed to fetch animals:', error);
      }
    );
  }

  handlePageEvent(event: PageEvent): void {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;
    const page = event.pageIndex + 1;

    this.apiService.getAnimals(
      new HttpParams()
        .set('page', page.toString())
        .set('type', type || '')
        .set('breed', breed || '')
        .set('gender', gender || '')
    ).subscribe(
      animals => {
        this.responseAnimals = animals;
        this.animals = animals.animals;
      },
      error => {
        console.error('Failed to fetch animals:', error);
      }
    );
  }
}
