import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './_services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}

  // This method determines whether the admin is authorized to access the route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the admin is logged in by looking for adminLogin in session storage
    const isLoggedIn = !!sessionStorage.getItem('adminLogin');

    // If not logged in, navigate to the admin login page
    if (!isLoggedIn) {
      this.router.navigateByUrl('/admin-login');
    }

    // Return true if the admin is logged in, allowing access to the route
    return isLoggedIn;
  }
}
