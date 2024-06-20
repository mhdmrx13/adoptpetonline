import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import { Animal, AnimalResponse, Breed, Types } from '../../interfaces/animal';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../services/authServices/auth.service';
import {AdoptPetService} from '../../services/adopt-pet/adopt-pet.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];
  ResponseAnimals: AnimalResponse | null = null;
  types: Types[] = [];
  breeds: Breed[] = [];
  genders: string[] = [];
  type_selected = new FormControl<string>('');
  breed_selected = new FormControl<string>('');
  gender_selected = new FormControl<string>('');
  adoptedPets: DocumentData[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private adoptPetService: AdoptPetService
  ) {
    this.adoptPetService.getAdoptedPets().subscribe(response => {
      this.adoptedPets = response;
    });
  }

  ngOnInit(): void {
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.authService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.apiService.authenticate().subscribe((response) => {
          this.apiService.setAccessToken(response.access_token);
          this.getAnimals(new HttpParams());
          this.apiService.getTypes().subscribe((response) => {
            this.types = response.types;
            this.genders = response.types[0].genders;
          });
        });
      } else {
        window.alert("please login or register to access this page");
      }
    });
  }

  getAnimals(params: HttpParams): void {
    this.apiService.getAnimals(params).subscribe(
      (animals) => {
        this.ResponseAnimals = animals;
        this.animals = animals.animals;
      },
      (error) => {
        console.error('Failed to fetch animals:', error);
      }
    );
  }

  getBreeds(breedUrl: string): void {
    this.apiService.getBreeds(breedUrl).subscribe(
      (response) => {
        this.breeds = response.breeds;
      },
      (error) => {
        console.error('Failed to fetch breeds:', error);
      }
    );
  }

  filter(): void {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;
    this.apiService.authenticate().subscribe((response) => {
      this.apiService.setAccessToken(response.access_token);
      this.getAnimals(
        new HttpParams()
          .set('type', type!)
          .set('breed', breed!)
          .set('gender', gender!)
          .set('page', 1)
      );
    });
  }

  handlePageEvent(event: PageEvent): void {
    const type = this.type_selected.value;
    const breed = this.breed_selected.value;
    const gender = this.gender_selected.value;
    const page = event.pageIndex + 1;
    this.apiService.authenticate().subscribe((response) => {
      this.apiService.setAccessToken(response.access_token);
      this.getAnimals(
        new HttpParams()
          .set('page', page.toString())
          .set('type', type!)
          .set('gender', gender!)
          .set('breed', breed!)
      );
    });
  }


  adoptPet(animal: Animal): void {
    this.adoptPetService.adoptPet(animal)
      .then(() => {
       
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }
  
  isAdopted(animal: Animal): boolean {
    return this.adoptedPets.some(adoptedPet => adoptedPet["id"] === animal.id);
  }

}
