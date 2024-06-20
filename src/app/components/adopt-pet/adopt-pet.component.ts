import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Animal } from '../../interfaces/animal';
import { ApiService } from '../../services/api/api.service';
import {AdoptPetService} from '../../services/adopt-pet/adopt-pet.service'

@Component({
  selector: 'app-adopt-pet',
  templateUrl: './adopt-pet.component.html',
  styleUrl: './adopt-pet.component.css'
})
export class AdoptPetComponent {
  adoptedPets: DocumentData[] = [];
  constructor(private apiService: ApiService, private router: Router, private adoptpetService: AdoptPetService) {
    this.adoptpetService.getAdoptedPets().subscribe(response => {
      this.adoptedPets = response;
    });
  }
  

  adoptPet(animal: DocumentData): void {
    const animalData = animal as Animal;
    this.adoptpetService.adoptPet(animalData)
      .then(() => {
       
      })
      .catch((error: any) => {
        window.Error(error.message);
      });
  }
  isAdopted(animal: DocumentData): boolean {
    return this.adoptedPets.some(adoptedPet => adoptedPet["id"] === animal["id"]);
  }
}