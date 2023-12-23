import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudentProfile } from '../data-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProfileService {

  private apiUrl = `${environment.studentProfile}`; // Use the API URL from environment

  constructor(private http: HttpClient) { }

  // Fetches a list of student profiles from the API
  getStudents(): Observable<IStudentProfile[]> {
    return this.http.get<IStudentProfile[]>(this.apiUrl);
  }

  // Adds a new student profile to the API
  addStudent(student: IStudentProfile): Observable<IStudentProfile> {
    return this.http.post<IStudentProfile>(this.apiUrl, student);
  }

  // Removes a student profile from the API
  removeStudent(id: number): Observable<IStudentProfile[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IStudentProfile[]>(url);
  }

  // Updates an existing student profile in the API
  updateStudent(profile: IStudentProfile): Observable<void> {
    const url = `${this.apiUrl}/${profile.id}`;
    return this.http.put<void>(url, profile);
  }
}
