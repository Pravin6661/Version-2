import { HttpClient } from '@angular/common/http';
import { IAdminSignIn} from '../data-type.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subject } from 'rxjs';
import { LoginCountService } from './login-count.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Subject to emit whether admin is logged in or not
  isAdminLoggedIn=new Subject<boolean>();
  // Subject to emit whether admin authentication is invalid
  invalidAdminAuth=new Subject<boolean>();

  constructor(private http:HttpClient,private router:Router,private loginCountService: LoginCountService) { }

  // Performs admin sign-in using provided credentials
  adminSignin(data: IAdminSignIn) {
    console.log('Admin Signin Data', data);

    this.http
      .get<IAdminSignIn[]>(`${environment.adminLogin}?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe(
        (response) => {
          console.log('API Response:', response);
          if (response && response.body && response.body.length > 0) {
            const adminLogin = response.body[0];
            sessionStorage.setItem('adminLogin', JSON.stringify(adminLogin));
            this.router.navigate(['/admin-dashboard']);
            this.invalidAdminAuth.next(false);
            this.isAdminLoggedIn.next(true);
            this.logAdminLogin(data.email);
          } else {
            this.invalidAdminAuth.next(true);
          }
        },
        (error) => {
          console.log('API Error:', error);
          this.invalidAdminAuth.next(true);
        }
      );
  }



  // Checks if there is an authenticated admin session and redirects to admin dashboard
  adminAuthReload(){
    if(sessionStorage.getItem('adminLogin')){
      this.router.navigate(['/admin-dashboard'])
    }
  }

  private logAdminLogin(email: string) {
    // Call the loginCountService to increment the admin login count
    this.loginCountService.incrementAdminLoginCount(email);
  }
}
