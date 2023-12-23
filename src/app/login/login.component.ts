import { Component,OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import { IStudentSignIn } from '../data-type.model';
import { LoggerService } from '../_services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authError: string = ""

  constructor(private userService: UserService, private logger: LoggerService){ }

  ngOnInit() {
     // Reloads the user authentication if user login data is already present
    this.userService.userAuthReload();
    this.logger.info('Login component initialized.');
  }

  signIn(data: IStudentSignIn){
    this.logger.debug('Sign-in form data: ' + JSON.stringify(data));

    if (!this.validateRegisterNumber(data.registernumber.toString())) {
      return;
    }

    // Calls the userSignin method from the UserService
    this.userService.userSignin(data)
    // Subscribes to the invalidUserAuth event to handle authentication errors
    this.userService.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError = "Invalid Login Credentials ☹";
        this.logger.warn('Invalid login credentials.');
       }
    });
  }

  validateRegisterNumber(registerNumber: string): boolean {
    const registerNumberPattern = /^\d{12}$/;

    if (!registerNumberPattern.test(registerNumber)) {
      alert('Invalid registration number. Please enter a 12-digit number.');
      return false;
    }

    return true;
  }

}












