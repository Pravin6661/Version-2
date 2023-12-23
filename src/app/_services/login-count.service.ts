import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginCountService {
  constructor(private http: HttpClient) {}

  // Increment student login count
  incrementStudentLoginCount(registerNumber: number) {
    // Make an HTTP request to increment the student login count in the database
    this.http.post<any>('http://localhost:3000/studentLoginCounts', { registerNumber }).subscribe(
      (response) => {
        // Log the successful saving of login information if needed
        console.log('Student login count incremented:', response);
      },
      (error) => {
        // Handle any errors if saving login information fails
        console.error('Error incrementing student login count:', error);
      }
    );
  }

  // Increment admin login count
  incrementAdminLoginCount(email: string) {
    // Make an HTTP request to increment the admin login count in the database
    this.http.post<any>('http://localhost:3000/adminLoginCounts', { email }).subscribe(
      (response) => {
        // Log the successful saving of login information if needed
        console.log('Admin login count incremented:', response);
      },
      (error) => {
        // Handle any errors if saving login information fails
        console.error('Error incrementing admin login count:', error);
      }
    );
  }

  // Get student login count for the day
  getStudentLoginCount(registerNumber: number): Observable<number> {
    // Make an HTTP request to get the student login count from the database
    return this.http.get<number>(`http://localhost:3000/studentLoginCounts/count?registerNumber=${registerNumber}`);
  }

  // Get admin login count for the day
  getAdminLoginCount(email: string): Observable<number> {
    // Make an HTTP request to get the admin login count from the database
    return this.http.get<number>(`http://localhost:3000/adminLoginCounts/count?email=${email}`);
  }
}
