import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().then(loggedIn => {
      const isAuthRoute = next.routeConfig?.path === 'login' || next.routeConfig?.path === 'register';
      if (loggedIn && isAuthRoute) {
        this.router.navigate(['/animals']);
        return false;
      } else if (!loggedIn && !isAuthRoute) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    });
  }
}