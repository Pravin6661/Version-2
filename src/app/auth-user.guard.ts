import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  // This method determines whether the user is authorized to access the route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is logged in by looking for login in session storage or BehaviorSubject value
    const isLoggedIn = !!sessionStorage.getItem('login') || this.userService.isUserLoggedIn.value;

    // If not logged in, navigate to the login page
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    // Return true if the user is logged in, allowing access to the route
    return isLoggedIn;
  }
}
