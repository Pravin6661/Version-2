import { HttpClient } from '@angular/common/http';
import { IStudentSignIn} from '../data-type.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginCountService } from './login-count.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn=new BehaviorSubject<boolean>(false)
  invalidUserAuth=new EventEmitter<boolean>(false)

constructor(private http:HttpClient,private router:Router,private loginCountService: LoginCountService) { }

// Handles the user sign-in process
userSignin(data: IStudentSignIn) {
  console.log(data);
  const dateOfBirth: Date = new Date(data.dateofbirth);
  const formattedDate = this.formatDate(dateOfBirth);
// Perform the user sign-in request
this.http.get<IStudentSignIn[]>(`${environment.studentLogin}?registernumber=${data.registernumber}&dateofbirth=${formattedDate}`,
    { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        // Store the user login information in session storage
        sessionStorage.setItem('login', JSON.stringify(result.body[0]));
        // Navigate to the user profile page
        this.router.navigate(['/profile']);
        this.invalidUserAuth.emit(false);
        this.isUserLoggedIn.next(true);
        this.logUserLogin(data.registernumber);
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
}

// Formats the given date to dd-mm-yyyy format
private formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

 // Checks if the user is already authenticated and reloads the user's authentication status
  userAuthReload(){
    if(sessionStorage.getItem('login')){
      this.router.navigate(['/profile'])
    }
  }

  private logUserLogin(registerNumber: number) {
    // Call the loginCountService to increment the student login count
    this.loginCountService.incrementStudentLoginCount(registerNumber);
  }
}
