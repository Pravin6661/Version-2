import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  template: '',
})
export class AdminLogoutComponent  {

  constructor(private router: Router) {
    this.adminlogout();
  }

  adminlogout(){
    sessionStorage.removeItem('adminLogin');
    this.router.navigate(['/admin-login']);
  }

}



