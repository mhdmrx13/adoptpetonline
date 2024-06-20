import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Animal } from '../../interfaces/animal';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredItems: Animal[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAnimals(new HttpParams()).subscribe(response => {
      const animalsWithPhotos = response.animals.filter((animal: Animal) => animal.photos.length > 0);
      this.featuredItems = this.getRandomItems(animalsWithPhotos, 3);
    });
  }

  getRandomItems(arr: Animal[], num: number): Animal[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  getStarted(): void {
    this.router.navigate(['/login']);
  }
}