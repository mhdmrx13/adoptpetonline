import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/authServices/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authState().subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}