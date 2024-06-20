import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Animal } from '../../interfaces/animal';

@Component({
  selector: 'app-adopt-pet',
  templateUrl: './adopt-pet.component.html',
  styleUrls: ['./adopt-pet.component.css']
})
export class AdoptPetComponent implements OnInit {
  adoptedPets: Animal[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserPets().subscribe(pets => {
      this.adoptedPets = pets;
    });
  }

  removePet(animal: Animal): void {
    this.apiService.removeUserPet(animal.id.toString()).then(() => {
      this.adoptedPets = this.adoptedPets.filter(pet => pet.id !== animal.id);
    });
  }
}