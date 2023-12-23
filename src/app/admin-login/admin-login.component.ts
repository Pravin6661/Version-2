import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { IAdminSignIn } from 'src/app/data-type.model';
import { LoggerService } from '../_services/logger.service';


@Component({
  selector: 'app-admin_login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class Admin_loginComponent implements OnInit {

  authError: string = ""

  constructor(private adminService: AdminService,private logger: LoggerService) { }

  ngOnInit() {
    // Reloads the admin authentication status if already logged in
    this.adminService.adminAuthReload();
    this.logger.info('Admin_login component initialized.');
  }

   // Handles the admin sign-in process
  signIn(data: IAdminSignIn) {
    this.logger.debug('Admin Sign-in form data: ' + JSON.stringify(data));
     // Calls the adminSignin method in the AdminService to perform the sign-in
    this.adminService.adminSignin(data);
    // Subscribes to the invalidAdminAuth event to handle authentication errors
    this.adminService.invalidAdminAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Invalid Login Credentials ☹';
        this.logger.warn('Invalid admin login credentials.');
      }
    });
  }

}
