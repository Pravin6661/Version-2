import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent  {

  constructor(private router: Router) {
    this.logout();
   }

  logout() {
    sessionStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

}
