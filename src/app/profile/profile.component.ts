import { Component, OnInit } from '@angular/core';
import { IStudentProfile } from '../data-type.model';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  studentProfile: IStudentProfile | undefined;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    // Retrieves the login data from session storage
    const loginData = sessionStorage.getItem('login');
    if (loginData) {
      // Parses the login data into an object
      const parsedLoginData = JSON.parse(loginData);
      const registerNumber = parsedLoginData?.registernumber;
      if (registerNumber) {
        // Fetches the student profile using the register number
        this.fetchStudentProfile(registerNumber);
      }
    }
  }

  fetchStudentProfile(registerNumber: string) {
     // Parse the register number as a number
    const numberRegisterNumber = parseInt(registerNumber, 10);
    // Calls the fetchStudentProfile method from the ProfileService
    this.profileService.fetchStudentProfile(numberRegisterNumber).subscribe((profiles) => {
      console.log('Fetched profiles:', profiles);
      // Finds the student profile that matches the register number
      const studentProfile = profiles.find((profile: IStudentProfile) => {
        console.log('Comparing:', profile.registernumber, numberRegisterNumber);
        return profile.registernumber === numberRegisterNumber;
      });
      console.log('Found student profile:', studentProfile);
      if (studentProfile) {
         // Sets the studentProfile property to the retrieved student profile
        this.studentProfile = studentProfile;
      } else {
        console.log('No student profile found');
      }
    });
  }
}






