import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.authenticate().subscribe({
      next: () => {
        console.log('Authenticated successfully');
      },
      error: (error) => {
        console.error('Authentication failed', error);
      }
    });
  }
}
